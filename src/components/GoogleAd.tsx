type GoogleAdProps = {
  slot?: string;
  format?: 'horizontal' | 'vertical' | 'square' | 'in-article';
  className?: string;
  label?: string;
};

// Los anuncios reales se gestionan mediante Auto Ads cuando se activa AdSense.
// No mostramos espacios ficticios ni identificadores de bloques inventados.
export default function GoogleAd(_props: GoogleAdProps) {
  void _props;
  return null;
}
