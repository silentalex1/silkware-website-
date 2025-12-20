const { useState, useEffect } = React;

const Checkpoint = () => {
    const [step, setStep] = useState(1);
    const [isChecking, setIsChecking] = useState(false);
    const [clickTime, setClickTime] = useState(0);
    const [error, setError] = useState(false);
    const [key, setKey] = useState(null);
    const [savedKeysModal, setSavedKeysModal] = useState(false);

    const links = {
        1: "https://work.ink/27Tr/ypomvhuy",
        2: "https://work.ink/27Tr/checkpoint-02",
        3: "https://work.ink/27Tr/ffft3jcz"
    };

    useEffect(() => {
        const handleFocus = () => {
            if (!isChecking) return;
            
            const elapsed = Date.now() - clickTime;
            if (elapsed > 10000) {
                if (step < 3) {
                    setStep(s => s + 1);
                    setIsChecking(false);
                } else {
                    fetchKey();
                }
            } else {
                setError(true);
                setIsChecking(false);
            }
        };

        window.addEventListener('focus', handleFocus);
        return () => window.removeEventListener('focus', handleFocus);
    }, [isChecking, clickTime, step]);

    const handleAction = () => {
        window.open(links[step], '_blank');
        setClickTime(Date.now());
        setIsChecking(true);
        setError(false);
    };

    const fetchKey = async () => {
        setStep(4);
        try {
            const res = await fetch("https://SilkWareTM.pythonanywhere.com/add_key?duration=6h");
            const data = await res.text();
            setKey(data.trim());
        } catch(e) {
            setKey("SILK-" + Math.random().toString(36).substring(2, 10).toUpperCase());
        }
    };

    const saveToSite = () => {
        const local = JSON.parse(localStorage.getItem('silk_keys') || "[]");
        local.push({ key: key, exp: Date.now() + (6 * 60 * 60 * 1000) });
        localStorage.setItem('silk_keys', JSON.stringify(local));
        alert("Key saved for 6 hours.");
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-6 relative z-10">
            <nav className="fixed top-0 w-full glass py-4 px-8 flex justify-between items-center z-50">
                <button onClick={() => window.location.href='../index.html'} className="text-gray-400 hover:text-white flex items-center gap-2 font-semibold">
                    <span>Go Back</span>
                </button>
                <div className="flex items-center gap-2 font-bold text-lg absolute left-1/2 -translate-x-1/2">
                    <img src="../silkwarelogo.png" className="h-8" />
                    <span>Silkware</span>
                </div>
                <button onClick={() => setSavedKeysModal(true)} className="text-gray-400 hover:text-white font-semibold">Keys</button>
            </nav>

            <div className="w-full max-w-md bg-card border border-white/5 rounded-[32px] p-10 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand to-transparent"></div>
                
                <h1 className="text-3xl font-black mb-2">{step > 3 ? "Complete" : `Checkpoint ${step}`}</h1>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-10">Step <span className="text-brand">{step > 3 ? 3 : step}</span> of 3</p>

                {error && <p className="text-red-500 text-sm font-semibold mb-4">Did you do the key system?</p>}
                {isChecking && <p className="text-gray-400 text-sm animate-pulse mb-4">Verifying...</p>}

                {step <= 3 ? (
                    <button onClick={handleAction} className="w-full bg-brand text-black font-black py-4 rounded-2xl hover:scale-[1.02] transition-all mb-8 shadow-xl shadow-brand/10">
                        Get Key Here
                    </button>
                ) : (
                    <div className="mb-8">
                        <div className="bg-white/5 border border-white/10 p-5 rounded-2xl mb-4 group cursor-pointer" onClick={() => {navigator.clipboard.writeText(key); alert('Copied');}}>
                            <span className="text-brand font-mono text-xl block truncate">{key || "GENERATING..."}</span>
                            <span className="text-[10px] text-gray-500 font-bold uppercase mt-2 block">Click to copy</span>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={saveToSite} className="flex-1 bg-brand text-black font-bold py-3 rounded-xl">Save key</button>
                            <button onClick={() => window.location.href='../index.html'} className="flex-1 bg-white/5 border border-white/10 font-bold py-3 rounded-xl">Close</button>
                        </div>
                    </div>
                )}

                <div className="space-y-2">
                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-brand transition-all duration-1000" style={{width: `${(Math.min(step, 3)/3)*100}%`}}></div>
                    </div>
                    <div className="flex justify-between text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                        <span>{step > 3 ? "Finished" : "Waiting"}</span>
                        <span>{Math.round((Math.min(step, 3)/3)*100)}%</span>
                    </div>
                </div>
            </div>

            {savedKeysModal && (
                <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-6">
                    <div className="bg-card border border-white/10 rounded-3xl w-full max-w-sm overflow-hidden">
                        <div className="p-6 border-b border-white/5 flex justify-between items-center">
                            <h3 className="font-bold">Your Keys</h3>
                            <button onClick={() => setSavedKeysModal(false)}>✕</button>
                        </div>
                        <div className="p-6 max-h-[300px] overflow-y-auto space-y-3">
                            {JSON.parse(localStorage.getItem('silk_keys') || "[]").map((k, i) => (
                                k.exp > Date.now() && <div key={i} className="bg-white/5 p-4 rounded-xl border border-white/5">
                                    <span className="text-brand font-mono block mb-1">{k.key}</span>
                                    <span className="text-[10px] text-gray-500 uppercase font-bold">Expires in 6h</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Checkpoint />);
