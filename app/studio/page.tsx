'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, Plus, X, Image as ImageIcon, Camera, Trash2, AlignLeft, AlignCenter, AlignRight, Download, RotateCcw } from 'lucide-react';

const FONTS = [
  { label: "Bodoni", val: "'Bodoni Moda', serif" },
  { label: "Playfair", val: "'Playfair Display', serif" },
  { label: "Cormorant", val: "'Cormorant Garamond', serif" },
  { label: "DM Serif", val: "'DM Serif Display', serif" },
  { label: "Baskerville", val: "'Libre Baskerville', serif" },
  { label: "Bebas", val: "'Bebas Neue', sans-serif" },
  { label: "Josefin", val: "'Josefin Sans', sans-serif" },
  { label: "Abril", val: "'Abril Fatface', serif" },
];

const TEXT_COLORS = ['#ffffff', '#f5e6c8', '#c9a84c', '#ffc0cb', '#0a0a0a', '#b8d4e8', '#ff4444'];

//const SAMPLE_PHOTOS: string[] = [
// ...
//];

type TextBox = {
  id: number;
  text: string;
  x: number;
  y: number;
  fontSize: number;
  fontFamily: string;
  color: string;
  align: 'left' | 'center' | 'right';
  bold: boolean;
  italic: boolean;
  width: number;
};

let nextId = 4;

export default function Studio() {
  const [activeTab, setActiveTab] = useState<'texts' | 'style' | 'photo' | 'cover'>('texts');

  const [boxes, setBoxes] = useState<TextBox[]>([
    { id: 2, text: "The Finleys' Wedding", x: 30, y: 400, fontSize: 32, fontFamily: "'Bodoni Moda', serif", color: "#ffffff", align: "center", bold: false, italic: false, width: 320 },
    { id: 3, text: "An Unforgettable Evening", x: 60, y: 370, fontSize: 11, fontFamily: "'Josefin Sans', sans-serif", color: "rgba(255,255,255,0.8)", align: "center", bold: false, italic: false, width: 260 },
  ]);
  const [selectedId, setSelectedId] = useState<number | null>(2);

  // Overlay
  const [ovStyle, setOvStyle] = useState('gradient-bottom');
  const [ovStrength, setOvStrength] = useState(70);

  // Photo
  const [bgImage, setBgImage] = useState(SAMPLE_PHOTOS[0]);
  const [sampleSelection, setSampleSelection] = useState(SAMPLE_PHOTOS[0]);
  const [imgPos, setImgPos] = useState(50);

  // Cover defaults
  const [mastheadTitle, setMastheadTitle] = useState('VOGUE');
  const [mastheadFont, setMastheadFont] = useState("'Bodoni Moda', serif");
  const [mastheadColor, setMastheadColor] = useState('#ffffff');
  const [mastheadSize, setMastheadSize] = useState(62);
  const [showBorder, setShowBorder] = useState(true);
  const [showIssue, setShowIssue] = useState(true);

  // Drag logic
  const [draggingId, setDraggingId] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handlePointerDown = (e: React.PointerEvent, id: number) => {
    if ((e.target as HTMLElement).classList.contains('resize-handle')) return;
    e.preventDefault();
    setSelectedId(id);
    const box = boxes.find(b => b.id === id);
    if (!box) return;
    setDraggingId(id);
    setDragOffset({ x: e.clientX - box.x, y: e.clientY - box.y });
  };

  useEffect(() => {
    if (draggingId === null) return;
    const onMove = (e: PointerEvent) => {
      setBoxes(prev => prev.map(b => b.id === draggingId ? { ...b, x: e.clientX - dragOffset.x, y: e.clientY - dragOffset.y } : b));
    };
    const onUp = () => setDraggingId(null);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    return () => { window.removeEventListener('pointermove', onMove); window.removeEventListener('pointerup', onUp); };
  }, [draggingId, dragOffset]);

  // Resize logic
  const [resizingId, setResizingId] = useState<number | null>(null);
  const [resizeOffset, setResizeOffset] = useState({ startX: 0, initialWidth: 0 });

  const handleResizeDown = (e: React.PointerEvent, id: number) => {
    e.stopPropagation(); e.preventDefault();
    const box = boxes.find(b => b.id === id);
    if (!box) return;
    setResizingId(id);
    setResizeOffset({ startX: e.clientX, initialWidth: box.width });
  };

  useEffect(() => {
    if (resizingId === null) return;
    const onMove = (e: PointerEvent) => {
      setBoxes(prev => prev.map(b => b.id === resizingId ? { ...b, width: Math.max(50, resizeOffset.initialWidth + (e.clientX - resizeOffset.startX)) } : b));
    };
    const onUp = () => setResizingId(null);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    return () => { window.removeEventListener('pointermove', onMove); window.removeEventListener('pointerup', onUp); };
  }, [resizingId, resizeOffset]);

  const addBox = () => {
    const newBox: TextBox = { id: nextId++, text: "New Text", x: 80, y: 250, fontSize: 24, fontFamily: "'Bodoni Moda', serif", color: "#ffffff", align: "center", bold: false, italic: false, width: 220 };
    setBoxes([...boxes, newBox]);
    setSelectedId(newBox.id);
    setActiveTab('texts');
  };

  const deleteBox = (id: number) => {
    setBoxes(boxes.filter(b => b.id !== id));
    if (selectedId === id) setSelectedId(null);
  };

  const getOverlayBackground = () => {
    const a = ovStrength / 100;
    switch (ovStyle) {
      case 'gradient-bottom': return `linear-gradient(to top, rgba(0,0,0,${a}) 0%, rgba(0,0,0,${a * 0.4}) 50%, rgba(0,0,0,${a * 0.1}) 100%)`;
      case 'gradient-full': return `linear-gradient(160deg, rgba(0,0,0,${a * 0.5}), rgba(0,0,0,${a}))`;
      case 'vignette': return `radial-gradient(ellipse at center, transparent 20%, rgba(0,0,0,${a}) 100%)`;
      case 'none': default: return 'none';
    }
  };

  const selectedBox = boxes.find(b => b.id === selectedId);

  const updateSelectedBox = (changes: Partial<TextBox>) => {
    if (!selectedId) return;
    setBoxes(boxes.map(b => b.id === selectedId ? { ...b, ...changes } : b));
  };

  return (
    <div className="h-screen w-full flex flex-col md:flex-row bg-zinc-950 text-zinc-100 font-sans overflow-hidden">
      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Josefin+Sans:wght@100;300;400;600&family=Bodoni+Moda:ital,wght@0,400;0,700;1,400&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Abril+Fatface&family=DM+Serif+Display:ital@0;1&family=Bebas+Neue&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap');
      `}} />

      {/* SIDEBAR */}
      <aside className="w-full md:w-[340px] bg-zinc-900 border-r border-zinc-800 flex flex-col h-full z-10 shrink-0">
        <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
          <div>
            <div className="font-serif text-xs tracking-[0.3em] uppercase text-zinc-400 mb-1">Interactive</div>
            <h1 className="font-serif text-2xl font-bold italic">Cover Studio</h1>
          </div>
          <Link href="/" className="p-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors border border-zinc-700">
            <X className="w-4 h-4 text-zinc-300" />
          </Link>
        </div>

        <div className="p-4 flex-1 overflow-y-auto custom-scrollbar">
          {/* Tabs */}
          <div className="flex bg-zinc-950 border border-zinc-800 p-1 rounded-lg mb-6">
            {['texts', 'style', 'photo', 'cover'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`flex-1 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-md transition-colors ${activeTab === tab ? 'bg-white text-zinc-950' : 'text-zinc-500 hover:text-white'}`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* TEXTS TAB */}
          {activeTab === 'texts' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="space-y-2">
                <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-3">Text Layers</div>
                <div className="space-y-2">
                  {boxes.map(b => (
                    <div
                      key={b.id}
                      className={`flex items-center gap-2 p-2.5 rounded-lg border cursor-pointer transition-colors ${selectedId === b.id ? 'border-white bg-zinc-800' : 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-700'}`}
                      onClick={() => setSelectedId(b.id)}
                    >
                      <div className="flex-1 truncate text-xs font-medium pl-1" style={{ fontFamily: b.fontFamily }}>
                        {b.text || '(empty)'}
                      </div>
                      <button onClick={(e) => { e.stopPropagation(); deleteBox(b.id); }} className="p-1.5 text-zinc-500 hover:text-red-400 hover:bg-zinc-800 rounded">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                  <button onClick={addBox} className="w-full py-3 border border-dashed border-zinc-700 text-zinc-400 hover:bg-zinc-800 hover:border-zinc-500 rounded-lg flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest font-bold transition-colors">
                    <Plus className="w-3.5 h-3.5" /> Add Text Layer
                  </button>
                </div>
              </div>

              {selectedBox ? (
                <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-xl space-y-4">
                  <div className="text-[10px] uppercase tracking-widest text-white font-bold pb-2 border-b border-zinc-800">Edit Selection</div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] uppercase tracking-wide text-zinc-500 font-bold">Content</label>
                    <input type="text" value={selectedBox.text} onChange={e => updateSelectedBox({ text: e.target.value })} className="w-full bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2 text-sm outline-none focus:border-white transition-colors" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-wide text-zinc-500 font-bold">Font Family</label>
                    <div className="grid grid-cols-2 gap-2">
                      {FONTS.map(f => (
                        <div
                          key={f.val}
                          onClick={() => updateSelectedBox({ fontFamily: f.val })}
                          className={`p-2 border rounded-md cursor-pointer transition-colors flex flex-col items-center justify-center bg-zinc-900 ${selectedBox.fontFamily === f.val ? 'border-white text-white' : 'border-zinc-800 text-zinc-400 hover:border-zinc-600'}`}
                        >
                          <div style={{ fontFamily: f.val }} className="text-xl mb-1 leading-none">Aa</div>
                          <div className="text-[9px] uppercase tracking-wider">{f.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[9px] uppercase tracking-wide text-zinc-500 font-bold">Size: {selectedBox.fontSize}px</label>
                      <input type="range" min="8" max="120" value={selectedBox.fontSize} onChange={e => updateSelectedBox({ fontSize: +e.target.value })} className="w-full accent-white" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[9px] uppercase tracking-wide text-zinc-500 font-bold">Align</label>
                      <div className="flex bg-zinc-900 border border-zinc-700 rounded-md p-1">
                        {[
                          { val: 'left', Icon: AlignLeft },
                          { val: 'center', Icon: AlignCenter },
                          { val: 'right', Icon: AlignRight }
                        ].map(a => (
                          <button key={a.val} onClick={() => updateSelectedBox({ align: a.val as any })} className={`flex-1 py-1 rounded flex justify-center items-center ${selectedBox.align === a.val ? 'bg-zinc-700 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}>
                            <a.Icon className="w-3 h-3" />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5 flex flex-col">
                    <label className="text-[9px] uppercase tracking-wide text-zinc-500 font-bold mb-1">Color</label>
                    <div className="flex flex-wrap gap-2">
                      {TEXT_COLORS.map(c => (
                        <div
                          key={c}
                          onClick={() => updateSelectedBox({ color: c })}
                          className={`w-6 h-6 rounded-full cursor-pointer flex-shrink-0 relative ${selectedBox.color === c ? 'ring-2 ring-white ring-offset-2 ring-offset-zinc-950' : ''}`}
                          style={{ backgroundColor: c, border: c === '#0a0a0a' ? '1px solid #333' : 'none' }}
                        />
                      ))}
                      <div className="flex items-center gap-2 border border-zinc-800 rounded-md p-1 bg-zinc-900 flex-1 min-w-[100px]">
                        <input type="color" value={selectedBox.color.startsWith('#') ? selectedBox.color : '#ffffff'} onChange={e => updateSelectedBox({ color: e.target.value })} className="w-5 h-5 bg-transparent border-none p-0 cursor-pointer rounded" />
                        <span className="text-[10px] text-zinc-400 uppercase">{selectedBox.color.startsWith('#') ? selectedBox.color : 'Custom'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <label className="relative flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="sr-only peer" checked={selectedBox.bold} onChange={e => updateSelectedBox({ bold: e.target.checked })} />
                      <div className="w-7 h-4 bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-white"></div>
                      <span className="text-[10px] font-bold uppercase text-zinc-400">Bold</span>
                    </label>
                    <label className="relative flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="sr-only peer" checked={selectedBox.italic} onChange={e => updateSelectedBox({ italic: e.target.checked })} />
                      <div className="w-7 h-4 bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-white"></div>
                      <span className="text-[10px] font-bold uppercase text-zinc-400">Italic</span>
                    </label>
                  </div>
                </div>
              ) : (
                <div className="bg-zinc-950 p-8 text-center rounded-xl border border-dashed border-zinc-800 text-zinc-500 text-xs mt-4 uppercase tracking-widest">
                  Select a text box <br /> on the cover to edit
                </div>
              )}
            </div>
          )}

          {/* STYLE TAB */}
          {activeTab === 'style' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="space-y-2">
                <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-3">Overlay Style</div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { val: 'gradient-bottom', label: 'Bottom Fade', bg: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' },
                    { val: 'gradient-full', label: 'Full Darken', bg: 'linear-gradient(160deg, rgba(0,0,0,0.4), rgba(0,0,0,0.8))' },
                    { val: 'vignette', label: 'Vignette', bg: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.8) 100%)' },
                    { val: 'none', label: 'No Overlay', bg: 'repeating-linear-gradient(45deg, #333 0, #333 2px, #222 2px, #222 6px)' },
                  ].map(st => (
                    <div key={st.val} onClick={() => setOvStyle(st.val)} className={`border rounded-lg overflow-hidden cursor-pointer transition-all ${ovStyle === st.val ? 'border-white ring-1 ring-white' : 'border-zinc-800 hover:border-zinc-600'}`}>
                      <div className="h-12 w-full" style={{ background: st.bg }}></div>
                      <div className="py-2 px-2 bg-zinc-900 text-[9px] uppercase tracking-widest text-center text-zinc-300">{st.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5 pt-4">
                <div className="flex justify-between">
                  <label className="text-[9px] uppercase tracking-wide text-zinc-500 font-bold">Overlay Strength</label>
                  <span className="text-[9px] font-bold text-zinc-300">{ovStrength}%</span>
                </div>
                <input type="range" min="0" max="100" value={ovStrength} onChange={e => setOvStrength(+e.target.value)} className="w-full accent-white" />
              </div>
            </div>
          )}

          {/* PHOTO TAB */}
          {activeTab === 'photo' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="space-y-3">
                <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Custom Photo</div>
                <label className="flex flex-col items-center justify-center border border-dashed border-zinc-700 bg-zinc-950 hover:bg-zinc-900 rounded-xl p-8 cursor-pointer transition-colors group">
                  <Camera className="w-6 h-6 text-zinc-500 group-hover:text-white transition-colors mb-4" />
                  <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-400 group-hover:text-zinc-300">Upload Image</span>
                  <input type="file" className="hidden" accept="image/*" onChange={e => {
                    const file = e.target.files?.[0];
                    if (file) { setBgImage(URL.createObjectURL(file)); setSampleSelection(''); }
                  }} />
                </label>
              </div>

              <div className="space-y-3">
                <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Sample Gallery</div>
                <div className="grid grid-cols-2 gap-3">
                  {SAMPLE_PHOTOS.map((src, i) => (
                    <div key={i} onClick={() => { setBgImage(src); setSampleSelection(src); }} className={`aspect-[3/4] rounded-lg overflow-hidden cursor-pointer border-2 transition-colors ${sampleSelection === src ? 'border-white' : 'border-transparent hover:border-zinc-700'}`}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={src} alt="Sample" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between">
                  <label className="text-[9px] uppercase tracking-wide text-zinc-500 font-bold">Vertical Position</label>
                  <span className="text-[9px] font-bold text-zinc-300">{imgPos}%</span>
                </div>
                <input type="range" min="0" max="100" value={imgPos} onChange={e => setImgPos(+e.target.value)} className="w-full accent-white" />
              </div>
            </div>
          )}

          {/* COVER TAB */}
          {activeTab === 'cover' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="space-y-3">
                <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2">Magazine Masthead</div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {['VOGUE', 'ELLE', 'BAZAAR', 'ALLURE'].map(mp => (
                    <button key={mp} onClick={() => setMastheadTitle(mp)} className={`px-2.5 py-1 text-[10px] uppercase font-bold tracking-widest border rounded transition-colors ${mastheadTitle === mp ? 'bg-white text-zinc-950 border-white' : 'bg-zinc-900 border-zinc-700 text-zinc-400 hover:border-zinc-500'}`}>
                      {mp}
                    </button>
                  ))}
                </div>
                <input type="text" value={mastheadTitle} onChange={e => setMastheadTitle(e.target.value)} placeholder="CUSTOM TITLE" className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-3 py-2 text-sm outline-none focus:border-white transition-colors uppercase font-bold tracking-widest" />
              </div>

              <div className="space-y-2 pt-2">
                <label className="text-[9px] uppercase tracking-wide text-zinc-500 font-bold">Masthead Font</label>
                <div className="grid grid-cols-2 gap-2">
                  {FONTS.map(f => (
                    <div key={f.val} onClick={() => setMastheadFont(f.val)} className={`p-2 border rounded-md cursor-pointer transition-colors flex flex-col items-center justify-center bg-zinc-900 ${mastheadFont === f.val ? 'border-white text-white' : 'border-zinc-800 text-zinc-400 hover:border-zinc-600'}`}>
                      <div style={{ fontFamily: f.val }} className="text-xl mb-1 leading-none">Aa</div>
                      <div className="text-[9px] uppercase tracking-wider">{f.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5 flex flex-col">
                  <label className="text-[9px] uppercase tracking-wide text-zinc-500 font-bold mb-1">Color</label>
                  <div className="flex items-center gap-2 border border-zinc-800 rounded-md p-1 bg-zinc-900 min-w-[100px]">
                    <input type="color" value={mastheadColor} onChange={e => setMastheadColor(e.target.value)} className="w-6 h-6 bg-transparent border-none p-0 cursor-pointer rounded" />
                    <span className="text-[10px] text-zinc-400 font-mono uppercase">{mastheadColor}</span>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase tracking-wide text-zinc-500 font-bold">Size: {mastheadSize}px</label>
                  <input type="range" min="30" max="150" value={mastheadSize} onChange={e => setMastheadSize(+e.target.value)} className="w-full accent-white" />
                </div>
              </div>

              <div className="pt-2 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-400">White Border Frame</span>
                  <label className="relative flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={showBorder} onChange={e => setShowBorder(e.target.checked)} />
                    <div className="w-8 h-5 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-500 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-white"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-400">Issue Metadata Line</span>
                  <label className="relative flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={showIssue} onChange={e => setShowIssue(e.target.checked)} />
                    <div className="w-8 h-5 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-500 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-white"></div>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-zinc-800 bg-zinc-950 space-y-3">
          <button
            onClick={() => alert("Ready to download! (Export feature utilizes client-side html2canvas in production. For this preview, please take a screenshot of your masterpiece.)")}
            className="w-full bg-white text-zinc-950 font-bold text-[10px] uppercase tracking-widest py-3 rounded-lg hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
          >
            <Download className="w-3.5 h-3.5" /> Download Cover
          </button>
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-transparent border border-zinc-700 text-zinc-400 font-bold text-[10px] uppercase tracking-widest py-2.5 rounded-lg hover:bg-zinc-900 transition-colors flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Start Over
          </button>
        </div>
      </aside>

      {/* PREVIEW AREA */}
      <main className="flex-1 overflow-auto relative flex items-center justify-center bg-zinc-950 p-8 xl:p-12" onClick={(e) => { if (e.target === e.currentTarget) setSelectedId(null) }}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.05)_1px,_transparent_1px)] bg-[length:24px_24px] pointer-events-none" />

        {/* Magazine Frame Container */}
        <div
          className="relative shadow-2xl shrink-0"
          style={{ width: 380, height: 560, transform: 'scale(0.95)', transformOrigin: 'center center' }}
        >
          {/* Background */}
          <div className="absolute inset-0 bg-cover bg-no-repeat transition-all duration-300" style={{ backgroundImage: `url(${bgImage})`, backgroundPosition: `center ${imgPos}%` }} />
          {/* Overlay Filter */}
          <div className="absolute inset-0 pointer-events-none transition-all duration-300" style={{ background: getOverlayBackground() }} />

          {/* Cover Border */}
          {showBorder && <div className="absolute inset-0 border-[16px] border-white pointer-events-none z-10 box-border" />}

          {/* Masthead */}
          <div className="absolute top-0 left-0 right-0 pointer-events-none z-10 flex flex-col items-center" style={{ paddingTop: showBorder ? '28px' : '12px' }}>
            <div style={{ fontFamily: mastheadFont, color: mastheadColor, fontSize: mastheadSize, letterSpacing: '6px', lineHeight: 1, textTransform: 'uppercase', transition: 'all 0.3s' }}>
              {mastheadTitle}
            </div>
            {showIssue && (
              <div className="flex items-center justify-center gap-2 mt-2">
                <span style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: '8px', letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.8)' }}>Special Edition</span>
                <span className="w-1 h-1 rounded-full bg-white opacity-50" />
                <span style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: '8px', letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.8)' }}>{new Date().getFullYear()}</span>
              </div>
            )}
          </div>

          {/* Draggable Texts */}
          {boxes.map(b => (
            <div
              key={b.id}
              className={`absolute border-[1.5px] border-dashed select-none transition-colors touch-none ${selectedId === b.id ? 'border-zinc-300 shadow-[0_0_0_1px_rgba(0,0,0,0.3)]' : 'border-transparent hover:border-zinc-500/50 cursor-pointer'}`}
              style={{ left: b.x, top: b.y, width: b.width, zIndex: selectedId === b.id ? 20 : 15, fontFamily: b.fontFamily, fontSize: b.fontSize, color: b.color, textAlign: b.align, fontWeight: b.bold ? 700 : 400, fontStyle: b.italic ? 'italic' : 'normal', lineHeight: 1.2, wordBreak: 'break-word', padding: '4px 6px', cursor: draggingId === b.id ? 'grabbing' : 'grab' }}
              onPointerDown={(e) => handlePointerDown(e, b.id)}
            >
              {/* Top Handle - Visual Only */}
              {selectedId === b.id && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-2.5 bg-white/90 rounded flex items-center justify-center">
                  <span className="text-[6px] leading-[0] text-zinc-900 translate-y-[1px]">⠿</span>
                </div>
              )}

              {b.text || '(empty)'}

              {/* Resize Handle */}
              {selectedId === b.id && (
                <div
                  className="absolute -bottom-1.5 -right-1.5 w-3.5 h-3.5 bg-white border border-zinc-800 rounded-sm cursor-se-resize resize-handle"
                  onPointerDown={(e) => handleResizeDown(e, b.id)}
                />
              )}
            </div>
          ))}

          {/* Helper overlay */}
          <div className="absolute bottom-6 left-0 right-0 text-center z-50 pointer-events-none animate-pulse">
            <span className="bg-zinc-950/80 backdrop-blur text-white font-serif text-[8px] uppercase tracking-widest px-4 py-1.5 rounded-full inline-block">
              Drag elements freely
            </span>
          </div>

        </div>
      </main>
    </div>
  );
}
