// 기본형
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BottomSheetProps {
	title: string;
	content: string;
	additionalContent?: string;
	isOpen: boolean;
	onClose: () => void;
}

export default function BottomSheet({
	title,
	content,
	additionalContent,
	isOpen,
	onClose,
}: BottomSheetProps) {
	return (
		<AnimatePresence>
			{isOpen && (
				<>
					{/* 오버레이 */}
					<motion.div
						className="absolute inset-0 bg-black/40 z-40"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={onClose}
					/>

					{/* 바텀시트 */}
					<motion.div
						className="
                            fixed bottom-0 left-1/2 -translate-x-1/2
                            w-full max-w-[430px] min-w-[375px]
                            flex flex-col
                            rounded-t-2xl shadow-lg
                            bg-white z-50
                            px-1.5 pt-1
                        "
						initial={{ y: '100%' }}
						animate={{ y: 0 }}
						exit={{ y: '100%' }}
						transition={{ type: 'tween', duration: 0.5 }}
						style={{ height: '300px' }}
					>
						<div className="flex justify-end p-3">
							<button onClick={onClose}>
								<img src="x.svg" />
							</button>
						</div>
						<div className="px-4 font-semibold text-black text-2xl">
							{title}
						</div>
						<div className="overflow-auto overscroll-contain p-4 text-[#787E8A]">
							{content}
						</div>
						{additionalContent && (
							<div className="overflow-auto overscroll-contain px-4 py-2 text-sm text-[#979EA4]">
								{additionalContent}
							</div>
						)}
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
}
