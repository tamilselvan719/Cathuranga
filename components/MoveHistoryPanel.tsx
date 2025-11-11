
import React, { useEffect, useRef } from 'react';

interface MoveHistoryPanelProps {
    moves: string[];
}

const MoveHistoryPanel: React.FC<MoveHistoryPanelProps> = ({ moves }) => {
    const scrollableContainerRef = useRef<HTMLDivElement>(null);

    const movePairs: { moveNumber: number; white: string; black: string }[] = [];
    for (let i = 0; i < moves.length; i += 2) {
        movePairs.push({
            moveNumber: i / 2 + 1,
            white: moves[i],
            black: moves[i + 1] || '',
        });
    }

    useEffect(() => {
        if (scrollableContainerRef.current) {
            scrollableContainerRef.current.scrollTop = scrollableContainerRef.current.scrollHeight;
        }
    }, [moves]);

    return (
        <div ref={scrollableContainerRef} className="bg-slate-800 rounded-md p-2 h-full overflow-y-auto">
            <h3 className="text-lg font-bold text-center text-slate-300 mb-2">Move History</h3>
            <table className="w-full text-sm text-left text-slate-300">
                <thead className="text-xs text-slate-400 uppercase sticky top-0 bg-slate-800 z-10">
                    <tr>
                        <th className="px-2 py-1 text-center w-8">#</th>
                        <th className="px-2 py-1">White</th>
                        <th className="px-2 py-1">Black</th>
                    </tr>
                </thead>
                <tbody>
                    {movePairs.map((pair, index) => (
                        <tr key={pair.moveNumber} className={`${index % 2 === 0 ? 'bg-slate-800' : 'bg-slate-700/50'}`}>
                            <td className="px-2 py-1 text-center font-semibold">{pair.moveNumber}.</td>
                            <td className="px-2 py-1 font-mono">{pair.white}</td>
                            <td className="px-2 py-1 font-mono">{pair.black}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MoveHistoryPanel;
