import { View } from 'react-native';
import { Svg, Circle } from 'react-native-svg';
import Animated, {
    useAnimatedProps,
    useSharedValue,
    withTiming
} from 'react-native-reanimated';
import { useEffect } from 'react';
import { AntDesign } from '@expo/vector-icons';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

type RingProgressProps = {
  radius?: number;
  strokeWidth?: number;
  progress: number; // Progress should be a value between 0 and 1
};

const color = '#e31b4b';

const RingProgress = ({
  radius = 150,
  strokeWidth = 50,
  progress = 0.5, // Default progress is set to 0.5 (50%)
}: RingProgressProps) => {
  const innerRadius = radius - strokeWidth / 2;
  const circumference = 2 * Math.PI * innerRadius;

  const fill = useSharedValue(0);

  useEffect(() => {
    fill.value = withTiming(progress, {duration: 1500});
  }, [progress]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDasharray: [circumference * fill.value, circumference]
  }))

  return (
    <View
      style={{
        width: radius * 2,
        height: radius * 2,
        alignSelf: 'center',
      }}
    >
      <Svg width={radius * 2} height={radius * 2}>
        {/* Background */}
        <Circle
          r={innerRadius}
          cx={radius}
          cy={radius}
          strokeWidth={strokeWidth}
          stroke={color}
          opacity={0.2}
        />

        {/* Foreground */}
        <AnimatedCircle
          animatedProps={animatedProps}
          r={innerRadius}
          cx={radius}
          cy={radius}
          originX={radius}
          originY={radius}
          strokeWidth={strokeWidth}
          stroke={color}
          fill="transparent"
          strokeLinecap="round"
          rotation="-90"
        />
      </Svg>
      <AntDesign 
      name="arrowright" 
      size={strokeWidth * 0.8} 
      color="black" 
      style={{ position: 'absolute', alignSelf: 'center', top: strokeWidth * 0.1 }}/>
    </View>
  );
};

export default RingProgress;
