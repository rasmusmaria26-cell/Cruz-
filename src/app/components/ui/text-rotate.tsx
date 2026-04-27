"use client"

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react"
import {
  AnimatePresence,
  motion,
  type AnimatePresenceProps,
  type MotionProps,
  type Transition,
} from "framer-motion"
import { cn } from "@/lib/utils"

interface TextRotateProps {
  texts: string[]
  rotationInterval?: number
  initial?: MotionProps["initial"]
  animate?: MotionProps["animate"]
  exit?: MotionProps["exit"]
  animatePresenceMode?: AnimatePresenceProps["mode"]
  animatePresenceInitial?: boolean
  staggerDuration?: number
  staggerFrom?: "first" | "last" | "center" | number | "random"
  transition?: Transition
  loop?: boolean
  auto?: boolean
  splitBy?: "words" | "characters" | "lines" | string
  onNext?: (index: number) => void
  mainClassName?: string
  splitLevelClassName?: string
  elementLevelClassName?: string
}

export interface TextRotateRef {
  next: () => void
  previous: () => void
  jumpTo: (index: number) => void
  reset: () => void
}

interface WordObject {
  characters: string[]
  needsSpace: boolean
}

const TextRotate = forwardRef<TextRotateRef, TextRotateProps>(
  (
    {
      texts,
      transition = { type: "spring", damping: 25, stiffness: 300 },
      initial = { y: "100%", opacity: 0 },
      animate = { y: 0, opacity: 1 },
      exit = { y: "-120%", opacity: 0 },
      animatePresenceMode = "wait",
      animatePresenceInitial = false,
      rotationInterval = 2000,
      staggerDuration = 0,
      staggerFrom = "first",
      loop = true,
      auto = true,
      splitBy = "characters",
      onNext,
      mainClassName,
      splitLevelClassName,
      elementLevelClassName,
      ...props
    },
    ref
  ) => {
    const [currentTextIndex, setCurrentTextIndex] = useState(0)

    const splitIntoCharacters = (text: string): string[] => {
      if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
<<<<<<< HEAD
        const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" })
=======
        const segmenter = new (Intl as any).Segmenter("en", { granularity: "grapheme" })
>>>>>>> e941c85ac94e12c42814fe86644bff6a6d54ada8
        return Array.from(segmenter.segment(text), ({ segment }: any) => segment)
      }
      return Array.from(text)
    }

    const elements = useMemo(() => {
      const currentText = texts[currentTextIndex]
      if (splitBy === "characters") {
        return currentText.split(" ").map((word, i, arr) => ({
          characters: splitIntoCharacters(word),
          needsSpace: i !== arr.length - 1,
        }))
      }
      return splitBy === "words"
        ? currentText.split(" ")
        : splitBy === "lines"
          ? currentText.split("\n")
          : currentText.split(splitBy)
    }, [texts, currentTextIndex, splitBy])

    const getStaggerDelay = useCallback(
      (index: number, total: number) => {
        if (staggerFrom === "first") return index * staggerDuration
        if (staggerFrom === "last") return (total - 1 - index) * staggerDuration
        if (staggerFrom === "center") return Math.abs(Math.floor(total / 2) - index) * staggerDuration
        if (staggerFrom === "random") return Math.abs(Math.floor(Math.random() * total) - index) * staggerDuration
        return Math.abs((staggerFrom as number) - index) * staggerDuration
      },
      [staggerFrom, staggerDuration]
    )

    const handleIndexChange = useCallback((newIndex: number) => {
      setCurrentTextIndex(newIndex)
      onNext?.(newIndex)
    }, [onNext])

    const next = useCallback(() => {
      const nextIndex = currentTextIndex === texts.length - 1 ? (loop ? 0 : currentTextIndex) : currentTextIndex + 1
      if (nextIndex !== currentTextIndex) handleIndexChange(nextIndex)
    }, [currentTextIndex, texts.length, loop, handleIndexChange])

    const previous = useCallback(() => {
      const prevIndex = currentTextIndex === 0 ? (loop ? texts.length - 1 : currentTextIndex) : currentTextIndex - 1
      if (prevIndex !== currentTextIndex) handleIndexChange(prevIndex)
    }, [currentTextIndex, texts.length, loop, handleIndexChange])

    const jumpTo = useCallback((index: number) => {
      const valid = Math.max(0, Math.min(index, texts.length - 1))
      if (valid !== currentTextIndex) handleIndexChange(valid)
    }, [texts.length, currentTextIndex, handleIndexChange])

    const reset = useCallback(() => {
      if (currentTextIndex !== 0) handleIndexChange(0)
    }, [currentTextIndex, handleIndexChange])

    useImperativeHandle(ref, () => ({ next, previous, jumpTo, reset }), [next, previous, jumpTo, reset])

    useEffect(() => {
      if (!auto) return
      const id = setInterval(next, rotationInterval)
      return () => clearInterval(id)
    }, [next, rotationInterval, auto])

    return (
      <motion.span className={cn("flex flex-wrap whitespace-pre-wrap", mainClassName)} {...props} layout transition={transition}>
        <span className="sr-only">{texts[currentTextIndex]}</span>
        <AnimatePresence mode={animatePresenceMode} initial={animatePresenceInitial}>
          <motion.div key={currentTextIndex} className={cn("flex flex-wrap", splitBy === "lines" && "flex-col w-full")} layout aria-hidden="true">
            {(splitBy === "characters"
              ? (elements as WordObject[])
              : (elements as string[]).map((el, i) => ({ characters: [el], needsSpace: i !== elements.length - 1 }))
            ).map((wordObj, wordIndex, array) => {
              const prevChars = array.slice(0, wordIndex).reduce((sum, w) => sum + w.characters.length, 0)
              const totalChars = array.reduce((sum, w) => sum + w.characters.length, 0)
              return (
                <span key={wordIndex} className={cn("inline-flex", splitLevelClassName)}>
                  {wordObj.characters.map((char, charIndex) => (
                    <motion.span
                      initial={initial} animate={animate} exit={exit} key={charIndex}
                      transition={{ ...transition, delay: getStaggerDelay(prevChars + charIndex, totalChars) }}
                      className={cn("inline-block", elementLevelClassName)}
                    >
                      {char}
                    </motion.span>
                  ))}
                  {wordObj.needsSpace && <span className="whitespace-pre"> </span>}
                </span>
              )
            })}
          </motion.div>
        </AnimatePresence>
      </motion.span>
    )
  }
)

TextRotate.displayName = "TextRotate"
export { TextRotate }
