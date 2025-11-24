import { useState, useRef } from 'react';
import { Button } from './ui/button';
import { Upload, FileText, CheckCircle, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface UploadProofProps {
  onUploadSuccess: () => void;
}

export default function UploadProof({ onUploadSuccess }: UploadProofProps) {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Ukuran file terlalu besar. Maksimal 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = () => {
    if (!previewImage) {
      toast.error('Pilih foto bukti setoran terlebih dahulu');
      return;
    }

    setIsUploading(true);

    // Simulate upload process
    setTimeout(() => {
      setIsUploading(false);
      onUploadSuccess();
    }, 1500);
  };

  return (
    <div className="space-y-4">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      <div className="text-center space-y-2 bg-gradient-to-br from-emerald-50 to-teal-50 p-4 rounded-2xl">
        <p className="text-gray-700">
          📸 Upload foto <strong>buku tabungan</strong> atau <strong>bukti transaksi</strong> dari Bank Sampah
        </p>
        <div className="flex items-center justify-center gap-2 text-emerald-600">
          <span className="text-2xl"></span>
          <p>
            Dapatkan <strong>+50 poin</strong> setiap setoran!
          </p>
          <span className="text-2xl"></span>
        </div>
      </div>

      {!previewImage ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-emerald-300 bg-emerald-50/50 rounded-3xl p-10 text-center cursor-pointer hover:border-emerald-500 hover:bg-emerald-50 transition-all"
        >
          <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <ImageIcon className="w-8 h-8 text-white" />
          </div>
          <p className="text-gray-700 mb-1"> Klik untuk upload foto</p>
          <p className="text-gray-500">PNG, JPG (Maks. 5MB)</p>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="relative rounded-3xl overflow-hidden border-4 border-emerald-500 shadow-lg">
            <img src={previewImage} alt="Bukti setoran" className="w-full h-64 object-cover" />
            <div className="absolute top-3 right-3 bg-emerald-500 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
              <CheckCircle className="w-5 h-5" />
              <span>Siap Upload! ✓</span>
            </div>
          </div>
          <Button
            onClick={() => fileInputRef.current?.click()}
            variant="outline"
            className="w-full rounded-2xl border-2 border-emerald-300"
          >
            <FileText className="mr-2 h-4 w-4" />
            Ganti Foto 
          </Button>
        </div>
      )}

      <div className="flex gap-2 pt-2">
        <Button
          onClick={handleUpload}
          disabled={!previewImage || isUploading}
          className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 rounded-2xl shadow-lg"
          size="lg"
        >
          {isUploading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Mengupload... 
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Konfirmasi Upload 
            </>
          )}
        </Button>
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-2xl p-4">
        <p className="text-blue-800 flex items-start gap-2">
          <span className="text-xl"></span>
          <span><strong>Tips:</strong> Pastikan foto jelas dan terlihat detail transaksi/tanggal untuk verifikasi</span>
        </p>
      </div>
    </div>
  );
}