import { View } from 'react-native';
import { Svg, Circle } from 'react-native-svg';

type RingProgressProps = {
  radius?: number;
  strokeWidth?: number;
  progress: number; // Progress should be a value between 0 and 1
};

const color = '#EE0F55';

const RingProgress = ({
  radius = 100,
  strokeWidth = 35,
  progress = 0.5, // Default progress is set to 0.5 (50%)
}: RingProgressProps) => {
  const innerRadius = radius - strokeWidth / 2;
  const circumference = 2 * Math.PI * innerRadius;

  // Calculate the dash array for the foreground circle based on the progress
  const dashArray = [circumference * progress, circumference];

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
        <Circle
          r={innerRadius}
          cx={radius}
          cy={radius}
          originX={radius}
          originY={radius}
          strokeWidth={strokeWidth}
          stroke={color}
          fill="transparent"
          strokeDasharray={dashArray}
          strokeLinecap="round"
          rotation="-90"
        />
      </Svg>
    </View>
  );
};

export default RingProgress;
