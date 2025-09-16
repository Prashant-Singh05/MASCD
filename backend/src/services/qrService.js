import QRCode from 'qrcode';

export async function generateBatchQrDataUrl(verificationUrl) {
  return QRCode.toDataURL(verificationUrl, { errorCorrectionLevel: 'M', margin: 1, scale: 4 });
}
