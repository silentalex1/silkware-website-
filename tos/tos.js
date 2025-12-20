const { useState } = React;

const TosApp = () => {
    const rules = [
        { id: 1, title: "No harassment", desc: "Don't be mean. No threats or bad words about race or identity. Don't try to trigger people. Don't lie about staff members." },
        { id: 2, title: "No NSFW or Gore", desc: "Posting adult content or horrific images is not allowed. This includes your private messages too." },
        { id: 3, title: "Be civil", desc: "Act like a good human. Don't start drama or annoy staff for fun. Follow all Discord terms." },
        { id: 4, title: "Don't steal info", desc: "Don't ask for passwords or trick people into giving personal info. All threats are taken seriously." },
        { id: 5, title: "Listen to staff", desc: "Staff members decide the punishments. You must follow what they say. High ranks can change rules if needed." },
        { id: 6, title: "No spam", desc: "Don't send the same message over and over. Don't flood the chat with text, stickers, or images." },
        { id: 7, title: "Maintain peace", desc: "Keep extreme thoughts to yourself. This is a safe space. Be nice to every individual." },
        { id: 8, title: "Don't bypass rules", desc: "Follow the rules as they are meant to be. Don't look for loopholes to avoid punishment." },
        { id: 9, title: "NO GOONING", desc: "No gooning allowed. Doing this results in an instant ban from the project." }
    ];

    return (
        <div className="min-h-screen pb-20">
            <nav className="p-6 flex items-center border-b border-white/5 bg-dark/50 backdrop-blur-md sticky top-0 z-50">
                <button onClick={() => window.location.href='/'} className="text-gray-400 hover:text-white flex items-center gap-2 font-bold transition-colors">
                    <span>← Go back</span>
                </button>
                <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 font-bold text-lg">
                    <img src="../silkwarelogo.png" className="h-8" />
                    <span>Silkware</span>
                </div>
            </nav>

            <div className="max-w-3xl mx-auto pt-20 px-6 rules-container">
                <div className="mb-12">
                    <h1 className="text-4xl font-black mb-4">Terms of Service</h1>
                    <p className="text-gray-500 font-medium">Please read and follow our simple rules below.</p>
                </div>

                <div className="space-y-6">
                    {rules.map((rule) => (
                        <div key={rule.id} className="bg-card border border-white/5 p-6 rounded-2xl hover:border-brand/30 transition-colors">
                            <div className="flex items-center gap-4 mb-2">
                                <span className="text-brand font-black text-sm">Rule #{rule.id}</span>
                                <h2 className="font-bold text-xl">{rule.title}</h2>
                            </div>
                            <p className="text-gray-400 leading-relaxed text-sm">{rule.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-16 p-8 bg-brand/5 border border-brand/20 rounded-3xl text-center">
                    <p className="text-brand font-bold">Breaking these rules will lead to a blacklist or ban.</p>
                </div>
            </div>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<TosApp />);
