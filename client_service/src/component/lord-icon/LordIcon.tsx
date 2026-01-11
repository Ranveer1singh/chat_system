type LordIconProps = {
  src: string;
  trigger?: "hover" | "click" | "loop" | "loop-on-hover";
  size?: number;
  colors?: string;
};

const LordIcon: React.FC<LordIconProps> = ({
  src,
  trigger = "hover",
  size = 50,
  colors,
}) => {
  return (
    <lord-icon
      src={src}
      trigger={trigger}
      colors={colors}
      style={{ width: size, height: size }}
    />
  );
};

export default LordIcon;
