export default function Wallpaper({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <div
      className="absolute inset-0 bg-cover bg-center transition-all duration-500"
      style={{
        backgroundImage: isDarkMode ? "url('https://4kwallpapers.com/images/wallpapers/macos-big-sur-apple-layers-fluidic-colorful-wwdc-stock-2880x1800-1455.jpg')" : "url('/wallpaper-day2.jpg')",
      }}
    />
  )
}
