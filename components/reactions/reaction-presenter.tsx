import React from 'react';
import PubNub from 'pubnub';
import { PubNubProvider, usePubNub } from 'pubnub-react';
import Particles from 'react-tsparticles';
import type { Container, ISourceOptions } from "tsparticles";

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
  channel: string;
}

const ReactionPresenter = (props:Props) => {
  const { channel } = props;

  const containerRef = React.useRef<Container>();

  const particlesLoaded = async (container:Container) => {
    containerRef.current = container;
  };

  const handleReaction = (event:any) => { console.log(event);
    // Don't trigger new particles while page isn't in focus
    if(containerRef.current?.pageHidden) return;

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
            value: ['🙂', '😂', '😍', '🤗', '😱', '😢', '😡'],
            font: 'Verdana',
            weight: 400,
            fill: true
          }
        },
        type: 'char'
      }
    };

    // containerRef.current?.particles.addParticle(undefined, particle);
  };

  return (
    <Particles
      style={{ position: 'absolute', top: 0, bottom: 0, right: 0, left: 0 }}
      options={options}
      loaded={particlesLoaded}
    />
  );
}

export default ReactionPresenter;
