'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import JsBarcode from 'jsbarcode';
import { Download, Copy, Check } from 'lucide-react';
import type { CodeCountryConfig } from '@/data/code-generators/types';
import type { BarcodeFormat } from '@/data/code-generators/types';
import { BARCODE_FORMATS, validateBarcodeValue } from '@/data/code-generators/encoders';

interface BarcodeGeneratorWidgetProps {
  config: CodeCountryConfig;
}

export default function BarcodeGeneratorWidget({ config }: BarcodeGeneratorWidgetProps) {
  const isUs = config.code === 'us';
  const svgRef = useRef<SVGSVGElement>(null);
  const [format, setFormat] = useState<BarcodeFormat>('CODE128');
  const [value, setValue] = useState('ZYVO-2024-001');
  const [barWidth, setBarWidth] = useState(2);
  const [barHeight, setBarHeight] = useState(80);
  const [displayValue, setDisplayValue] = useState(true);
  const [lineColor, setLineColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const labels = isUs
    ? {
        format: 'Barcode format',
        value: 'Value to encode',
        preview: 'Preview',
        downloadPng: 'Download PNG',
        downloadSvg: 'Download SVG',
        copy: 'Copy value',
        copied: 'Copied!',
        customize: 'Customize',
        barWidth: 'Bar width',
        barHeight: 'Height',
        showText: 'Show text below',
        lineColor: 'Bar color',
        bgColor: 'Background',
        noData: 'Enter a value to generate your barcode',
        errors: {
          empty: 'Please enter a value',
          ean13: 'EAN-13 requires 12 or 13 digits',
          ean8: 'EAN-8 requires 7 or 8 digits',
          upc: 'UPC-A requires 11 or 12 digits',
          itf14: 'ITF-14 requires 13 or 14 digits',
          msi: 'MSI requires digits only',
          pharmacode: 'Pharmacode must be between 3 and 131070',
          code39: 'Code 39 allows uppercase letters, digits and limited symbols',
        },
      }
    : {
        format: 'Format code-barres',
        value: 'Valeur à encoder',
        preview: 'Aperçu',
        downloadPng: 'Télécharger PNG',
        downloadSvg: 'Télécharger SVG',
        copy: 'Copier la valeur',
        copied: 'Copié !',
        customize: 'Personnaliser',
        barWidth: 'Largeur des barres',
        barHeight: 'Hauteur',
        showText: 'Afficher le texte',
        lineColor: 'Couleur des barres',
        bgColor: 'Arrière-plan',
        noData: 'Entrez une valeur pour générer votre code-barres',
        errors: {
          empty: 'Veuillez entrer une valeur',
          ean13: 'EAN-13 nécessite 12 ou 13 chiffres',
          ean8: 'EAN-8 nécessite 7 ou 8 chiffres',
          upc: 'UPC-A nécessite 11 ou 12 chiffres',
          itf14: 'ITF-14 nécessite 13 ou 14 chiffres',
          msi: 'MSI nécessite des chiffres uniquement',
          pharmacode: 'Pharmacode doit être entre 3 et 131070',
          code39: 'Code 39 autorise majuscules, chiffres et symboles limités',
        },
      };

  const formatInfo = BARCODE_FORMATS.find((f) => f.id === format);

  useEffect(() => {
    const validationError = validateBarcodeValue(format, value);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null);

    if (!svgRef.current || !value.trim()) return;

    try {
      JsBarcode(svgRef.current, value.trim(), {
        format,
        width: barWidth,
        height: barHeight,
        displayValue,
        lineColor,
        background: bgColor,
        margin: 10,
        fontSize: 14,
      });
    } catch {
      setError('invalid');
    }
  }, [format, value, barWidth, barHeight, displayValue, lineColor, bgColor]);

  const downloadSvg = useCallback(() => {
    if (!svgRef.current) return;
    const svgData = new XMLSerializer().serializeToString(svgRef.current);
    const blob = new Blob([svgData], { type: 'image/svg+xml' });
    const link = document.createElement('a');
    link.download = `barcode-${format}-${Date.now()}.svg`;
    link.href = URL.createObjectURL(blob);
    link.click();
  }, [format]);

  const downloadPng = useCallback(() => {
    if (!svgRef.current) return;
    const svgData = new XMLSerializer().serializeToString(svgRef.current);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      const link = document.createElement('a');
      link.download = `barcode-${format}-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    };
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  }, [format]);

  const copyValue = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isValid = !error && value.trim().length > 0;

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 lg:p-8 shadow-sm space-y-6">
        <Field label={labels.format}>
          <div className="grid grid-cols-2 gap-2">
            {BARCODE_FORMATS.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => {
                  setFormat(f.id);
                  setValue(f.example);
                }}
                className={`rounded-xl px-3 py-2.5 text-left text-sm transition-all ${
                  format === f.id
                    ? 'bg-brand-primary text-white shadow-md'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
                }`}
              >
                <span className="font-semibold block">{isUs ? f.labelEn : f.labelFr}</span>
                <span className={`text-xs ${format === f.id ? 'text-white/80' : 'text-gray-500'}`}>
                  {isUs ? f.hintEn : f.hintFr}
                </span>
              </button>
            ))}
          </div>
        </Field>

        <Field label={labels.value}>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={formatInfo?.example}
            className="w-full rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-5 py-4 text-lg font-bold focus:border-brand-primary focus:outline-none"
          />
          {error && (
            <p className="mt-2 text-sm text-red-500">
              {labels.errors[error as keyof typeof labels.errors] ?? (isUs ? 'Invalid value for this format' : 'Valeur invalide pour ce format')}
            </p>
          )}
        </Field>

        <Field label={labels.customize}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">{labels.barWidth}</label>
              <input type="range" min={1} max={4} step={0.5} value={barWidth} onChange={(e) => setBarWidth(Number(e.target.value))} className="w-full" />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">{labels.barHeight}</label>
              <input type="range" min={40} max={150} value={barHeight} onChange={(e) => setBarHeight(Number(e.target.value))} className="w-full" />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">{labels.lineColor}</label>
              <input type="color" value={lineColor} onChange={(e) => setLineColor(e.target.value)} className="w-full h-10 rounded-lg cursor-pointer" />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">{labels.bgColor}</label>
              <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-full h-10 rounded-lg cursor-pointer" />
            </div>
            <label className="col-span-2 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <input type="checkbox" checked={displayValue} onChange={(e) => setDisplayValue(e.target.checked)} className="rounded" />
              {labels.showText}
            </label>
          </div>
        </Field>
      </div>

      <div className="rounded-3xl bg-gradient-to-br from-brand-primary to-brand-accent p-6 lg:p-8 text-white shadow-lg flex flex-col">
        <p className="text-sm font-semibold uppercase tracking-wider text-white/80 mb-4">{labels.preview}</p>

        <div className="flex-1 flex flex-col items-center justify-center">
          {isValid ? (
            <>
              <div className="bg-white p-6 rounded-2xl shadow-lg mb-6 w-full max-w-md overflow-x-auto">
                <svg ref={svgRef} />
              </div>
              <div className="flex flex-wrap gap-3 justify-center">
                <ActionButton onClick={downloadPng} icon={<Download className="w-4 h-4" />}>
                  {labels.downloadPng}
                </ActionButton>
                <ActionButton onClick={downloadSvg} icon={<Download className="w-4 h-4" />}>
                  {labels.downloadSvg}
                </ActionButton>
                <ActionButton onClick={copyValue} icon={copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}>
                  {copied ? labels.copied : labels.copy}
                </ActionButton>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📊</div>
              <p className="text-white/90 text-lg">{labels.noData}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">{label}</label>
      {children}
    </div>
  );
}

function ActionButton({
  onClick,
  icon,
  children,
}: {
  onClick: () => void;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur px-4 py-2.5 text-sm font-semibold transition-all"
    >
      {icon}
      {children}
    </button>
  );
}
