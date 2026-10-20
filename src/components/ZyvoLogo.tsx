import Image from 'next/image';

type ZyvoLogoProps = {
  size?: number;
  className?: string;
  priority?: boolean;
};

export default function ZyvoLogo({ size = 40, className = 'rounded-lg', priority = false }: ZyvoLogoProps) {
  return (
    <Image
      src="/images/zyvo-logo.jpg"
      alt="ZYVO"
      width={size}
      height={size}
      className={className}
      priority={priority}
    />
  );
}
