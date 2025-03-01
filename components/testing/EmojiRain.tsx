import React, { useState, useEffect, useCallback } from 'react'
import { View, Text, StyleSheet, Animated, Dimensions, Easing, ViewStyle, TextStyle } from 'react-native'

const Y = Dimensions.get('window').height

export type EmojiDropProps = {
  emoji: string
}

export type EmojiRainProps = {
  count?: number,
  trigger?: boolean,
  onRainComplete?: () => void
} & EmojiDropProps

function drops(count: number = 25, props: EmojiDropProps, trigger: number) {
  const list = []
  for (let i = 0; i < count; i++) {
    list.push(<EmojiDrop key={`${trigger}-${i}`} {...props} />)
  }
  return list
}

export function EmojiRain(props: EmojiRainProps) {
  const { count = 25, emoji, trigger = false, onRainComplete } = props
  const [rainTrigger, setRainTrigger] = useState(0)

  useEffect(() => {
    if (trigger) {
      setRainTrigger(prev => prev + 1)
    }
  }, [trigger])

  const handleAnimationComplete = useCallback(() => {
    if (onRainComplete) {
      onRainComplete()
    }
  }, [onRainComplete])

  return (
    <View style={styles.container} pointerEvents="none">
      {rainTrigger > 0 ? drops(count, { emoji }, rainTrigger).map((drop, index) =>
        React.cloneElement(drop, {
          onAnimationComplete: index === count - 1 ? handleAnimationComplete : undefined
        })
      ) : null}
    </View>
  )
}

export function useDropAnimation(onAnimationComplete?: () => void) {
  const [animated] = useState(new Animated.Value(0))
  const [style] = useState<TextStyle>({
    position: 'absolute',
    top: 0,
    left: `${Math.random() * 100}%`
  })
  const [scale] = useState(1.2 + Math.random())

  function animation() {
    Animated.timing(animated, {
      toValue: 1,
      delay: Math.round(Math.random() * 300),
      duration: 750 + Math.round(Math.random() * 400),
      easing: Easing.in(Easing.ease),
      useNativeDriver: true
    }).start(({ finished }) => {
      if (finished && onAnimationComplete) {
        onAnimationComplete()
      }
    })
  }

  useEffect(animation, [1])
  return {
    ...style,
    transform: [{
      translateY: animated.interpolate({
        inputRange: [0, 1],
        outputRange: [-50, Y + 50]
      }),
    }, { scale }]
  }
}

function EmojiDrop(props: EmojiDropProps & { onAnimationComplete?: () => void }) {
  const style = useDropAnimation(props.onAnimationComplete)
  return <Animated.Text style={style}>{props.emoji}</Animated.Text>
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0, bottom: 0,
    left: 0, right: 0
  }
})