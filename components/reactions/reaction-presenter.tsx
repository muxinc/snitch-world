import React from 'react';
import Pubnub from 'pubnub';
import Particles from 'react-tsparticles';
import type { Container, ISourceOptions } from "tsparticles";

import usePubnubManager from '@/hooks/use-pubnub-manager';
import style from './index.module.css';

const options:ISourceOptions = {
  fpsLimit: 120,
  fullScreen: false,
  particles: {
    number: {
      value: 0
    }
  }
};

interface Props {
  publishId: string;
}

const ReactionPresenter = (props:Props) => {
  const { publishId } = props;

  const containerRef = React.useRef<Container>();

  const { addMessageListener } = usePubnubManager();

  React.useEffect(() => {
    addMessageListener(handleReaction);
  }, []);

  const particlesLoaded = async (container:Container) => {
    containerRef.current = container;
  };

  const handleReaction = ({ message, channel }: Pubnub.MessageEvent) => {
    // Don't trigger new particles while page isn't in focus
    if(containerRef.current?.pageHidden) return;
    if(channel !== `${publishId}-reactions`) return;

    const particle:any = {
      life: {
        count: 1,
        duration: {
          value: 2,
          sync: true
        }
      },
      move: {
        direction: 'top' as 'top', // Eww.
        enable: true,
        outModes: 'out',
        random: false,
        speed: 5,
        straight: false
      },
      size: {
        value: 20
      },
      opacity: {
        value: {
          min: 0,
          max: 1,
        },
        animation: {
          enable: true,
          speed: 0.7,
          sync: true,
          startValue: 'max',
          destroy: 'min',
        },
      },
      shape: {
        options: {
          char: {
            value: [message.reaction],
            font: 'Verdana',
            weight: 400,
            fill: true
          }
        },
        type: 'char'
      }
    };

    containerRef.current?.particles.addParticle(undefined, particle);
  };

  return (
    <div className={style.presenterContainer}>
      <Particles
        options={options}
        loaded={particlesLoaded}
      />
    </div>
  );
}

export default ReactionPresenter;
