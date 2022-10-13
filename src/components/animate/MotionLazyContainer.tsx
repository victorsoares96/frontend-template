import { LazyMotion } from 'framer-motion';

const loadFeatures = () => import('./features.js').then((res) => res.default);

interface Props {
  children: React.ReactNode;
}

function MotionLazyContainer({ children }: Props) {
  return (
    <LazyMotion strict features={loadFeatures}>
      {children}
    </LazyMotion>
  );
}

export default MotionLazyContainer;
