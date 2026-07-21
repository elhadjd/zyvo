'use client';

import { useCallback, useMemo, useRef, useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Download, Copy, Check } from 'lucide-react';
import type { CodeCountryConfig } from '@/data/code-generators/types';
import type { QrContentType } from '@/data/code-generators/types';
import { buildQrPayload, QR_CONTENT_TYPES } from '@/data/code-generators/encoders';

interface QrCodeGeneratorWidgetProps {
  config: CodeCountryConfig;
}

const DEFAULT_FIELDS: Record<QrContentType, Record<string, string>> = {
  url: { url: 'https://zyvo.io' },
  text: { text: '' },
  email: { email: '', subject: '', body: '' },
  phone: { phone: '' },
  sms: { phone: '', message: '' },
  wifi: { ssid: '', password: '', encryption: 'WPA', hidden: 'false' },
  vcard: {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    organization: '',
    title: '',
    website: '',
    address: '',
  },
  whatsapp: { phone: '', message: '' },
};

export default function QrCodeGeneratorWidget({ config }: QrCodeGeneratorWidgetProps) {
  const isUs = config.code === 'us';
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [contentType, setContentType] = useState<QrContentType>('url');
  const [fields, setFields] = useState(DEFAULT_FIELDS);
  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [size, setSize] = useState(256);
  const [errorLevel, setErrorLevel] = useState<'L' | 'M' | 'Q' | 'H'>('M');
  const [copied, setCopied] = useState(false);

  const labels = isUs
    ? {
        type: 'QR code type',
        preview: 'Preview',
        downloadPng: 'Download PNG',
        downloadSvg: 'Download SVG',
        copy: 'Copy data',
        copied: 'Copied!',
        customize: 'Customize',
        foreground: 'Foreground color',
        background: 'Background color',
        size: 'Size (px)',
        errorCorrection: 'Error correction',
        noData: 'Enter data to generate your QR code',
        payload: 'Encoded data',
      }
    : {
        type: 'Type de QR code',
        preview: 'Aperçu',
        downloadPng: 'Télécharger PNG',
        downloadSvg: 'Télécharger SVG',
        copy: 'Copier les données',
        copied: 'Copié !',
        customize: 'Personnaliser',
        foreground: 'Couleur avant-plan',
        background: 'Couleur arrière-plan',
        size: 'Taille (px)',
        errorCorrection: 'Correction d\'erreur',
        noData: 'Entrez des données pour générer votre QR code',
        payload: 'Données encodées',
      };

  const payload = useMemo(
    () => buildQrPayload(contentType, fields[contentType]),
    [contentType, fields]
  );

  const updateField = (key: string, value: string) => {
    setFields((prev) => ({
      ...prev,
      [contentType]: { ...prev[contentType], [key]: value },
    }));
  };

  const downloadPng = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !payload) return;
    const link = document.createElement('a');
    link.download = `qr-code-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  }, [payload]);

  const downloadSvg = useCallback(() => {
    if (!payload) return;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
      <foreignObject width="100%" height="100%">
        <div xmlns="http://www.w3.org/1999/xhtml" style="width:${size}px;height:${size}px;">
          ${document.querySelector('#qr-code-container canvas')?.outerHTML ?? ''}
        </div>
      </foreignObject>
    </svg>`;
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const link = document.createElement('a');
    link.download = `qr-code-${Date.now()}.svg`;
    link.href = URL.createObjectURL(blob);
    link.click();
  }, [payload, size]);

  const copyPayload = async () => {
    if (!payload) return;
    await navigator.clipboard.writeText(payload);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 lg:p-8 shadow-sm space-y-6">
        <Field label={labels.type}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {QR_CONTENT_TYPES.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setContentType(t.id)}
                className={`rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                  contentType === t.id
                    ? 'bg-brand-primary text-white shadow-md'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <span className="mr-1">{t.icon}</span>
                {isUs ? t.labelEn : t.labelFr}
              </button>
            ))}
          </div>
        </Field>

        <QrTypeFields
          type={contentType}
          fields={fields[contentType]}
          onChange={updateField}
          isUs={isUs}
        />

        <Field label={labels.customize}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">{labels.foreground}</label>
              <input type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="w-full h-10 rounded-lg cursor-pointer" />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">{labels.background}</label>
              <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-full h-10 rounded-lg cursor-pointer" />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">{labels.size}</label>
              <select
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-2 text-sm"
              >
                {[128, 192, 256, 384, 512].map((s) => (
                  <option key={s} value={s}>{s}px</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">{labels.errorCorrection}</label>
              <select
                value={errorLevel}
                onChange={(e) => setErrorLevel(e.target.value as 'L' | 'M' | 'Q' | 'H')}
                className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-2 text-sm"
              >
                <option value="L">L (7%)</option>
                <option value="M">M (15%)</option>
                <option value="Q">Q (25%)</option>
                <option value="H">H (30%)</option>
              </select>
            </div>
          </div>
        </Field>
      </div>

      <div className="rounded-3xl bg-gradient-to-br from-brand-primary to-brand-accent p-6 lg:p-8 text-white shadow-lg flex flex-col">
        <p className="text-sm font-semibold uppercase tracking-wider text-white/80 mb-4">{labels.preview}</p>

        <div id="qr-code-container" className="flex-1 flex flex-col items-center justify-center">
          {payload ? (
            <>
              <div className="bg-white p-4 rounded-2xl shadow-lg mb-6">
                <QRCodeCanvas
                  ref={canvasRef}
                  value={payload}
                  size={size}
                  fgColor={fgColor}
                  bgColor={bgColor}
                  level={errorLevel}
                  includeMargin
                />
              </div>
              <div className="w-full space-y-2 mb-4">
                <p className="text-xs text-white/70">{labels.payload}</p>
                <p className="text-sm bg-white/10 rounded-xl px-3 py-2 break-all font-mono">{payload}</p>
              </div>
              <div className="flex flex-wrap gap-3 w-full justify-center">
                <ActionButton onClick={downloadPng} icon={<Download className="w-4 h-4" />}>
                  {labels.downloadPng}
                </ActionButton>
                <ActionButton onClick={downloadSvg} icon={<Download className="w-4 h-4" />}>
                  {labels.downloadSvg}
                </ActionButton>
                <ActionButton onClick={copyPayload} icon={copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}>
                  {copied ? labels.copied : labels.copy}
                </ActionButton>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📱</div>
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

function Input({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-3 text-sm font-medium focus:border-brand-primary focus:outline-none"
      />
    </div>
  );
}

function QrTypeFields({
  type,
  fields,
  onChange,
  isUs,
}: {
  type: QrContentType;
  fields: Record<string, string>;
  onChange: (key: string, value: string) => void;
  isUs: boolean;
}) {
  const l = isUs
    ? {
        url: 'Website URL', text: 'Text', email: 'Email address', subject: 'Subject', body: 'Message',
        phone: 'Phone number', message: 'Message', ssid: 'Network name (SSID)', password: 'Password',
        encryption: 'Encryption', hidden: 'Hidden network', firstName: 'First name', lastName: 'Last name',
        organization: 'Company', title: 'Job title', website: 'Website', address: 'Address',
      }
    : {
        url: 'URL du site', text: 'Texte', email: 'Adresse e-mail', subject: 'Objet', body: 'Message',
        phone: 'Numéro de téléphone', message: 'Message', ssid: 'Nom du réseau (SSID)', password: 'Mot de passe',
        encryption: 'Chiffrement', hidden: 'Réseau masqué', firstName: 'Prénom', lastName: 'Nom',
        organization: 'Entreprise', title: 'Poste', website: 'Site web', address: 'Adresse',
      };

  switch (type) {
    case 'url':
      return <Input label={l.url} value={fields.url ?? ''} onChange={(v) => onChange('url', v)} placeholder="https://example.com" />;
    case 'text':
      return (
        <textarea
          value={fields.text ?? ''}
          onChange={(e) => onChange('text', e.target.value)}
          placeholder={l.text}
          rows={4}
          className="w-full rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-3 text-sm focus:border-brand-primary focus:outline-none"
        />
      );
    case 'email':
      return (
        <div className="space-y-3">
          <Input label={l.email} value={fields.email ?? ''} onChange={(v) => onChange('email', v)} placeholder="contact@example.com" />
          <Input label={l.subject} value={fields.subject ?? ''} onChange={(v) => onChange('subject', v)} />
          <Input label={l.body} value={fields.body ?? ''} onChange={(v) => onChange('body', v)} />
        </div>
      );
    case 'phone':
      return <Input label={l.phone} value={fields.phone ?? ''} onChange={(v) => onChange('phone', v)} placeholder="+221 77 000 00 00" />;
    case 'sms':
      return (
        <div className="space-y-3">
          <Input label={l.phone} value={fields.phone ?? ''} onChange={(v) => onChange('phone', v)} placeholder="+221 77 000 00 00" />
          <Input label={l.message} value={fields.message ?? ''} onChange={(v) => onChange('message', v)} />
        </div>
      );
    case 'whatsapp':
      return (
        <div className="space-y-3">
          <Input label={l.phone} value={fields.phone ?? ''} onChange={(v) => onChange('phone', v)} placeholder="221770000000" />
          <Input label={l.message} value={fields.message ?? ''} onChange={(v) => onChange('message', v)} placeholder={isUs ? 'Hello!' : 'Bonjour !'} />
        </div>
      );
    case 'wifi':
      return (
        <div className="space-y-3">
          <Input label={l.ssid} value={fields.ssid ?? ''} onChange={(v) => onChange('ssid', v)} />
          <Input label={l.password} value={fields.password ?? ''} onChange={(v) => onChange('password', v)} type="password" />
          <div>
            <label className="text-xs text-gray-500 mb-1 block">{l.encryption}</label>
            <select
              value={fields.encryption ?? 'WPA'}
              onChange={(e) => onChange('encryption', e.target.value)}
              className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-2 text-sm"
            >
              <option value="WPA">WPA/WPA2</option>
              <option value="WEP">WEP</option>
              <option value="nopass">{isUs ? 'None (open)' : 'Aucun (ouvert)'}</option>
            </select>
          </div>
        </div>
      );
    case 'vcard':
      return (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <Input label={l.firstName} value={fields.firstName ?? ''} onChange={(v) => onChange('firstName', v)} />
            <Input label={l.lastName} value={fields.lastName ?? ''} onChange={(v) => onChange('lastName', v)} />
          </div>
          <Input label={l.phone} value={fields.phone ?? ''} onChange={(v) => onChange('phone', v)} />
          <Input label={l.email} value={fields.email ?? ''} onChange={(v) => onChange('email', v)} />
          <Input label={l.organization} value={fields.organization ?? ''} onChange={(v) => onChange('organization', v)} />
          <Input label={l.title} value={fields.title ?? ''} onChange={(v) => onChange('title', v)} />
          <Input label={l.website} value={fields.website ?? ''} onChange={(v) => onChange('website', v)} />
          <Input label={l.address} value={fields.address ?? ''} onChange={(v) => onChange('address', v)} />
        </div>
      );
    default:
      return null;
  }
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
