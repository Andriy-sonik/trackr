export const useTheme = () => {
  type TTheme = 'light' | 'dark'
  const theme = useState<TTheme>('theme', () => 'light')

  const setTheme = (newTheme: TTheme) => {
    theme.value = newTheme

    document.documentElement.setAttribute('data-theme', newTheme)
    localStorage.setItem('theme', newTheme)
  }

  onMounted(() => {
    const savedTheme = localStorage.getItem('theme') as TTheme | null
    if (savedTheme) {
      setTheme(savedTheme)
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setTheme(prefersDark ? 'dark' : 'light')
    }
  })

  return {
    theme,
    setTheme,
  }
}
