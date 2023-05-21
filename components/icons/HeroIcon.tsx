import * as OutlineIcons from "@heroicons/react/24/outline";
import * as SolidIcons from "@heroicons/react/24/solid";

export type IconName = keyof typeof SolidIcons | keyof typeof OutlineIcons;

type HeroIconProps = {
  icon: IconName;
  className?: string;
  outline?: boolean;
  onClick?: (icon: IconName) => void;
};

export default function HeroIcon({
  icon,
  className,
  outline = false,
  onClick,
}: HeroIconProps) {
  const Icon = outline ? OutlineIcons[icon] : SolidIcons[icon];

  return (
    <Icon
      className={className}
      onClick={onClick ? () => onClick(icon) : undefined}
    />
  );
}
