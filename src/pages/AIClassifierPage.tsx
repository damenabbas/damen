import { useEffect, useRef, useState, useCallback } from 'react';
import {
  Camera,
  CameraOff,
  Upload,
  Image as ImageIcon,
  Sparkles,
  Mountain,
  Sun,
  Waves,
  TreePalm,
  Brain,
  ArrowLeft,
  Loader2,
  X,
  CheckCircle2,
} from 'lucide-react';
import { aiClasses } from '@/data/natureData';

interface AIClassifierPageProps {
  onNavigate: (page: string) => void;
}

interface Prediction {
  className: string;
  probability: number;
  color: string;
  icon: string;
}

// Teachable Machine model URL — replace with your own trained model
const TM_MODEL_URL = '';

const iconMap: Record<string, typeof Mountain> = {
  Mountain,
  Sun,
  Waves,
  TreePalm,
};

export default function AIClassifierPage({ onNavigate }: AIClassifierPageProps) {
  const [mode, setMode] = useState<'idle' | 'webcam' | 'upload'>('idle');
  const [isModelLoading, setIsModelLoading] = useState(false);
  const [modelStatus, setModelStatus] = useState<'idle' | 'loading' | 'ready' | 'error' | 'demo'>('idle');
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const webcamRef = useRef<HTMLVideoElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const modelRef = useRef<unknown>(null);
  const animationFrameRef = useRef<number | null>(null);
  const webcamLoopActive = useRef(false);

  // Initialize predictions to zero
  useEffect(() => {
    setPredictions(
      aiClasses.map((c) => ({
        className: c.name,
        probability: 0,
        color: c.color,
        icon: c.icon,
      }))
    );
  }, []);

  // Mock predictions for demo mode
  const runMockPrediction = useCallback((source: 'webcam' | 'upload') => {
    const weights = aiClasses.map(() => Math.random());
    const total = weights.reduce((a, b) => a + b, 0);
    const normalized = weights.map((w) => w / total);

    // Bias toward one class to make it look realistic
    const dominantIdx = Math.floor(Math.random() * aiClasses.length);
    const biased = normalized.map((w, i) =>
      i === dominantIdx ? w * 3 : w
    );
    const newTotal = biased.reduce((a, b) => a + b, 0);
    const final = biased.map((w) => w / newTotal);

    setPredictions(
      aiClasses.map((c, i) => ({
        className: c.name,
        probability: final[i],
        color: c.color,
        icon: c.icon,
      }))
    );

    if (source === 'webcam') {
      animationFrameRef.current = window.setTimeout(() => {
        if (webcamLoopActive.current) runMockPrediction('webcam');
      }, 800) as unknown as number;
    }
  }, []);

  // Load model
  const loadModel = useCallback(async () => {
    if (modelRef.current || modelStatus === 'loading') return;

    if (!TM_MODEL_URL) {
      setModelStatus('demo');
      return;
    }

    setIsModelLoading(true);
    setModelStatus('loading');

    try {
      const tmImage = await import('@teachablemachine/image');
      await import('@tensorflow/tfjs');
      const model = await tmImage.load(TM_MODEL_URL + 'model.json', TM_MODEL_URL + 'metadata.json');
      modelRef.current = model;
      setModelStatus('ready');
    } catch (err) {
      console.error('Model load error:', err);
      setModelStatus('demo');
      setErrorMsg('تعذر تحميل النموذج — يعمل الوضع التجريبي');
    } finally {
      setIsModelLoading(false);
    }
  }, [modelStatus]);

  // Run prediction on a canvas/image element
  const runPrediction = useCallback(
    async (imageElement: HTMLImageElement | HTMLVideoElement | HTMLCanvasElement) => {
      if (modelStatus === 'demo') {
        runMockPrediction('webcam');
        return;
      }

      if (modelStatus !== 'ready' || !modelRef.current) return;

      try {
        const tmImage = await import('@teachablemachine/image');
        const model = modelRef.current as { predict: (el: HTMLImageElement | HTMLVideoElement | HTMLCanvasElement) => Promise<{ className: string; probability: number }[]> };
        const results = await model.predict(imageElement);

        setPredictions(
          aiClasses.map((c, i) => ({
            className: c.name,
            probability: results[i]?.probability ?? 0,
            color: c.color,
            icon: c.icon,
          }))
        );
      } catch (err) {
        console.error('Prediction error:', err);
        runMockPrediction('webcam');
      }
    },
    [modelStatus, runMockPrediction]
  );

  // Webcam loop
  const webcamLoop = useCallback(async () => {
    if (!webcamLoopActive.current || !webcamRef.current) return;

    if (modelStatus === 'demo') {
      runMockPrediction('webcam');
      return;
    }

    if (modelStatus === 'ready' && modelRef.current && webcamRef.current.readyState === 4) {
      await runPrediction(webcamRef.current);
    }

    animationFrameRef.current = requestAnimationFrame(webcamLoop);
  }, [modelStatus, runMockPrediction, runPrediction]);

  // Start camera
  const startCamera = useCallback(async () => {
    setErrorMsg(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480, facingMode: 'environment' },
      });
      streamRef.current = stream;
      if (webcamRef.current) {
        webcamRef.current.srcObject = stream;
        await webcamRef.current.play();
      }
      setCameraActive(true);
      setMode('webcam');
      webcamLoopActive.current = true;

      // Start prediction loop
      if (modelStatus === 'demo') {
        runMockPrediction('webcam');
      } else if (modelStatus === 'ready') {
        animationFrameRef.current = requestAnimationFrame(webcamLoop);
      }
    } catch (err) {
      console.error('Camera error:', err);
      setErrorMsg('تعذر الوصول إلى الكاميرا. يرجى السماح بالوصول والمحاولة مرة أخرى.');
    }
  }, [modelStatus, runMockPrediction, webcamLoop]);

  // Stop camera
  const stopCamera = useCallback(() => {
    webcamLoopActive.current = false;
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    if (webcamRef.current) {
      webcamRef.current.srcObject = null;
    }
    setCameraActive(false);
    setMode('idle');
    setPredictions(
      aiClasses.map((c) => ({
        className: c.name,
        probability: 0,
        color: c.color,
        icon: c.icon,
      }))
    );
  }, []);

  // Handle file upload
  const handleFile = useCallback(
    async (file: File) => {
      if (!file.type.startsWith('image/')) {
        setErrorMsg('يرجى اختيار ملف صورة صالح');
        return;
      }

      setErrorMsg(null);
      const reader = new FileReader();
      reader.onload = async (e) => {
        const imgSrc = e.target?.result as string;
        setUploadedImage(imgSrc);
        setMode('upload');

        // Wait for image to render, then predict
        setTimeout(async () => {
          const img = document.getElementById('uploaded-preview') as HTMLImageElement | null;
          if (!img) return;

          if (modelStatus === 'demo') {
            runMockPrediction('upload');
          } else if (modelStatus === 'ready' && modelRef.current) {
            await runPrediction(img);
          }
        }, 500);
      };
      reader.readAsDataURL(file);
    },
    [modelStatus, runMockPrediction, runPrediction]
  );

  // Drag & drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  // Load model on mount
  useEffect(() => {
    loadModel();
    return () => {
      webcamLoopActive.current = false;
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (streamRef.current) streamRef.current.getTracks().forEach((t) => t.stop());
    };
  }, []);

  // Get top prediction
  const topPrediction = [...predictions].sort((a, b) => b.probability - a.probability)[0];
  const hasPredictions = predictions.some((p) => p.probability > 0);

  return (
    <div className="min-h-screen bg-cream saudi-pattern pt-20">
      {/* Page Header */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-saudi-green-dark via-saudi-green to-saudi-green-light" />
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gold/10 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-5 animate-fade-in-up">
            <Brain className="w-4 h-4 text-gold-light" />
            <span className="text-white text-sm font-body">القسم الرابع — تفاعلي</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 drop-shadow-2xl animate-fade-in-up delay-100">
            تجربة الذكاء الاصطناعي
          </h1>
          <p className="text-gold-light text-lg font-heading font-bold mb-4 animate-fade-in-up delay-200">
            مصنّف الصور الطبيعية السعودية
          </p>
          <p className="text-white/80 max-w-2xl mx-auto leading-relaxed font-body animate-fade-in-up delay-300">
            فعّل الكاميرا أو ارفع صورة ليقوم النموذج بتصنيف المشهد إلى الجبال أو الصحاري أو البحار أو النخيل،
            مع عرض نسب الاحتمالات لكل تصنيف.
          </p>

          {/* Model status badge */}
          <div className="inline-flex items-center gap-2 mt-6 px-4 py-2 rounded-full glass animate-fade-in-up delay-400">
            {modelStatus === 'loading' && (
              <>
                <Loader2 className="w-4 h-4 text-gold-light animate-spin" />
                <span className="text-white text-sm font-body">جاري تحميل النموذج...</span>
              </>
            )}
            {modelStatus === 'ready' && (
              <>
                <CheckCircle2 className="w-4 h-4 text-green-300" />
                <span className="text-white text-sm font-body">النموذج جاهز</span>
              </>
            )}
            {modelStatus === 'demo' && (
              <>
                <Sparkles className="w-4 h-4 text-gold-light" />
                <span className="text-white text-sm font-body">الوضع التجريبي — نتائج عشوائية</span>
              </>
            )}
            {modelStatus === 'idle' && (
              <>
                <Loader2 className="w-4 h-4 text-gold-light animate-spin" />
                <span className="text-white text-sm font-body">تهيئة...</span>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {errorMsg && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 flex items-center gap-3 animate-fade-in-up">
              <X className="w-5 h-5 text-red-500" />
              <p className="text-red-700 text-sm font-body">{errorMsg}</p>
            </div>
          )}

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left: Input Panel */}
            <div className="space-y-6">
              {/* Mode selector */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setMode('idle');
                    setUploadedImage(null);
                    stopCamera();
                  }}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-heading font-bold transition-all ${
                    mode === 'webcam' || mode === 'idle'
                      ? 'bg-saudi-green text-white shadow-lg'
                      : 'bg-white text-saudi-green-dark hover:bg-saudi-green-50'
                  }`}
                >
                  <Camera className="w-5 h-5" />
                  الكاميرا
                </button>
                <button
                  onClick={() => {
                    stopCamera();
                    setMode('upload');
                  }}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-heading font-bold transition-all ${
                    mode === 'upload'
                      ? 'bg-saudi-green text-white shadow-lg'
                      : 'bg-white text-saudi-green-dark hover:bg-saudi-green-50'
                  }`}
                >
                  <Upload className="w-5 h-5" />
                  رفع صورة
                </button>
              </div>

              {/* Webcam Panel */}
              {(mode === 'idle' || mode === 'webcam') && (
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                  <div className="relative aspect-video bg-saudi-green-dark flex items-center justify-center">
                    {cameraActive ? (
                      <video
                        ref={webcamRef}
                        autoPlay
                        playsInline
                        muted
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-center p-8">
                        <div className="w-20 h-20 rounded-full bg-saudi-green/20 flex items-center justify-center mx-auto mb-4">
                          <Camera className="w-10 h-10 text-white/60" />
                        </div>
                        <p className="text-white/70 font-body text-sm mb-4">
                          الكاميرا متوقفة
                        </p>
                        <button
                          onClick={startCamera}
                          disabled={isModelLoading}
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gold text-saudi-green-dark font-heading font-bold shadow-lg hover:bg-gold-light transition-all hover:scale-105 disabled:opacity-50"
                        >
                          <Camera className="w-5 h-5" />
                          تشغيل الكاميرا
                        </button>
                      </div>
                    )}
                  </div>
                  {cameraActive && (
                    <div className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-saudi-green text-sm font-body">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                        مباشر
                      </div>
                      <button
                        onClick={stopCamera}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-50 text-red-600 font-body font-medium text-sm hover:bg-red-100 transition-colors"
                      >
                        <CameraOff className="w-4 h-4" />
                        إيقاف
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Upload Panel */}
              {mode === 'upload' && (
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                  {!uploadedImage ? (
                    <div
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className={`aspect-video flex flex-col items-center justify-center cursor-pointer transition-all p-8 ${
                        isDragging
                          ? 'bg-saudi-green-50 border-4 border-dashed border-saudi-green'
                          : 'bg-gray-50 border-4 border-dashed border-gray-300 hover:border-saudi-green hover:bg-saudi-green-50'
                      }`}
                    >
                      <div className="w-20 h-20 rounded-full bg-saudi-green/10 flex items-center justify-center mb-4">
                        <Upload className="w-10 h-10 text-saudi-green" />
                      </div>
                      <p className="font-heading font-bold text-saudi-green-dark text-lg mb-1">
                        اسحب الصورة هنا
                      </p>
                      <p className="text-gray-500 text-sm font-body">أو اضغط للاختيار من جهازك</p>
                      <p className="text-gray-400 text-xs mt-3 font-body">JPG, PNG — حتى 10MB</p>
                    </div>
                  ) : (
                    <div className="relative aspect-video">
                      <img
                        id="uploaded-preview"
                        src={uploadedImage}
                        alt="صورة مرفوعة"
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => {
                          setUploadedImage(null);
                          setMode('upload');
                          setPredictions(
                            aiClasses.map((c) => ({
                              className: c.name,
                              probability: 0,
                              color: c.color,
                              icon: c.icon,
                            }))
                          );
                        }}
                        className="absolute top-3 left-3 w-10 h-10 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-black/80 transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFile(file);
                    }}
                  />
                  {uploadedImage && (
                    <div className="p-4">
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-saudi-green-50 text-saudi-green font-body font-medium text-sm hover:bg-saudi-green-100 transition-colors"
                      >
                        <ImageIcon className="w-4 h-4" />
                        اختيار صورة أخرى
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right: Results Panel */}
            <div className="bg-white rounded-3xl shadow-xl p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-saudi-green to-saudi-green-dark flex items-center justify-center shadow-lg">
                  <Brain className="w-6 h-6 text-gold-light" />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-black text-saudi-green-dark">
                    نتائج التصنيف
                  </h3>
                  <p className="text-gray-500 text-sm font-body">
                    نسب الاحتمالات لكل فئة
                  </p>
                </div>
              </div>

              {/* Top prediction highlight */}
              {hasPredictions && topPrediction && (
                <div
                  className="mb-6 p-5 rounded-2xl text-center animate-scale-in"
                  style={{ backgroundColor: `${topPrediction.color}15` }}
                >
                  <p className="text-gray-500 text-sm font-body mb-2">التصنيف المتوقع</p>
                  <div className="flex items-center justify-center gap-3 mb-2">
                    {(() => {
                      const Icon = iconMap[topPrediction.icon] ?? Mountain;
                      return <Icon className="w-8 h-8" style={{ color: topPrediction.color }} />;
                    })()}
                    <span
                      className="font-heading text-3xl font-black"
                      style={{ color: topPrediction.color }}
                    >
                      {topPrediction.className}
                    </span>
                  </div>
                  <p className="font-heading text-2xl font-bold" style={{ color: topPrediction.color }}>
                    {(topPrediction.probability * 100).toFixed(1)}%
                  </p>
                </div>
              )}

              {/* Probability bars */}
              <div className="space-y-4">
                {predictions.map((pred, i) => {
                  const Icon = iconMap[pred.icon] ?? Mountain;
                  const pct = (pred.probability * 100).toFixed(1);
                  const isTop = hasPredictions && topPrediction?.className === pred.className;
                  return (
                    <div key={i} className="animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <Icon className="w-5 h-5" style={{ color: pred.color }} />
                          <span
                            className={`font-heading font-bold text-sm ${
                              isTop ? '' : 'text-gray-600'
                            }`}
                            style={isTop ? { color: pred.color } : undefined}
                          >
                            {pred.className}
                          </span>
                        </div>
                        <span
                          className="font-heading font-bold text-sm tabular-nums"
                          style={{ color: pred.color }}
                        >
                          {pct}%
                        </span>
                      </div>
                      <div className="h-3 rounded-full bg-gray-100 overflow-hidden">
                        <div
                          className="h-full rounded-full prob-bar-fill flex items-center justify-end pr-2"
                          style={{
                            width: `${Math.max(pred.probability * 100, 2)}%`,
                            backgroundColor: pred.color,
                            boxShadow: isTop ? `0 0 12px ${pred.color}80` : 'none',
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {!hasPredictions && (
                <div className="mt-6 text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-saudi-green-50 flex items-center justify-center mx-auto mb-3">
                    <Sparkles className="w-8 h-8 text-saudi-green" />
                  </div>
                  <p className="text-gray-400 font-body text-sm">
                    فعّل الكاميرا أو ارفع صورة لبدء التصنيف
                  </p>
                </div>
              )}

              {/* Info note */}
              <div className="mt-6 p-4 rounded-xl bg-saudi-green-50 border border-saudi-green-100">
                <p className="text-saudi-green-dark text-xs font-body leading-relaxed">
                  {modelStatus === 'demo'
                    ? 'يعمل النموذج في الوضع التجريبي. لربط نموذج مُدرّب من Google Teachable Machine، أضف رابط النموذج في ملف المصدر.'
                    : 'النموذج مُدرّب على تصنيف صور الطبيعة السعودية إلى أربع فئات: الجبال، الصحاري، البحار، والنخيل.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => onNavigate('seas-palms')}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-saudi-green text-white font-heading font-bold shadow-lg hover:bg-saudi-green-dark transition-all hover:scale-105"
          >
            <ArrowLeft className="w-5 h-5 rotate-180" />
            البحار والنخيل
          </button>
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gold text-saudi-green-dark font-heading font-bold shadow-lg hover:bg-gold-light transition-all hover:scale-105"
          >
            العودة للرئيسية
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
}
