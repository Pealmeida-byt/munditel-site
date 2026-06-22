"use client";

// ─────────────────────────────────────────────────────────────────────────────
// LOGO MUNDITEL — símbolo vetorizado da logo original + texto, com animação.
//
// As "fatias" curvas (traçadas da logo real) aparecem em sequência, como ondas
// de sinal se propagando (conectividade), e o semicírculo surge por último.
//
// Props:
//   - height: altura da logo em px
//   - animateOnce: true = anima uma vez (loading); false = ondas em loop suave (header)
//   - showText: mostra "Munditel" + slogan ao lado
// ─────────────────────────────────────────────────────────────────────────────

export default function MunditelLogo({
  height = 48,
  animateOnce = false,
  showText = true,
}: {
  height?: number;
  animateOnce?: boolean;
  showText?: boolean;
}) {
  const slicePaths = [
    "M 20.9 70.8 L 21.8 62.9 L 22.6 60.3 L 23.5 62.9 L 24.4 64.7 L 25.3 67.3 L 26.2 69.1 L 27.0 70.8 L 27.9 72.6 L 28.8 75.2 L 29.7 77.8 L 30.6 80.5 L 31.4 82.2 L 32.3 84.9 L 33.2 86.6 L 34.1 89.2 L 35.0 91.9 L 35.8 95.4 L 36.7 100.6 L 37.6 126.9 L 37.6 150.6 L 36.7 160.2 L 35.8 163.7 L 35.0 167.3 L 34.1 169.9 L 33.2 171.6 L 32.3 174.3 L 31.4 176.0 L 30.6 178.6 L 29.7 180.4 L 28.8 183.0 L 27.9 184.8 L 27.0 186.5 L 26.2 188.3 L 25.3 190.0 L 24.4 191.8 L 23.5 192.7 L 22.6 193.5 L 21.8 185.7 L 20.9 169.9 Z",
    "M 40.2 58.6 L 41.1 49.8 L 42.0 48.9 L 42.9 49.8 L 43.8 51.6 L 44.6 52.4 L 45.5 54.2 L 46.4 55.9 L 47.3 56.8 L 48.2 58.6 L 49.0 60.3 L 49.9 61.2 L 50.8 62.9 L 51.7 64.7 L 52.6 66.5 L 53.4 68.2 L 54.3 70.0 L 55.2 72.6 L 56.1 74.3 L 57.0 77.0 L 57.8 80.5 L 58.7 84.0 L 59.6 87.5 L 60.5 126.1 L 60.5 155.0 L 59.6 169.9 L 58.7 175.1 L 57.8 177.8 L 57.0 181.3 L 56.1 183.9 L 55.2 185.7 L 54.3 188.3 L 53.4 190.0 L 52.6 191.8 L 51.7 193.5 L 50.8 195.3 L 49.9 197.1 L 49.0 198.8 L 48.2 200.6 L 47.3 202.3 L 46.4 204.1 L 45.5 205.8 L 44.6 206.7 L 43.8 208.4 L 42.9 210.2 L 42.0 210.2 L 41.1 203.2 L 40.2 190.9 Z",
    "M 63.1 48.0 L 64.0 39.3 L 64.9 34.0 L 65.8 34.0 L 66.6 35.8 L 67.5 37.5 L 68.4 38.4 L 69.3 40.2 L 70.2 41.0 L 71.0 42.8 L 71.9 43.7 L 72.8 45.4 L 73.7 46.3 L 74.6 48.0 L 75.4 48.9 L 76.3 50.7 L 77.2 52.4 L 78.1 54.2 L 79.0 56.8 L 79.8 58.6 L 80.7 61.2 L 81.6 64.7 L 82.5 70.0 L 82.5 191.8 L 81.6 196.2 L 80.7 199.7 L 79.8 201.4 L 79.0 204.1 L 78.1 205.8 L 77.2 208.4 L 76.3 210.2 L 75.4 211.1 L 74.6 212.8 L 73.7 214.6 L 72.8 216.3 L 71.9 218.1 L 71.0 219.0 L 70.2 220.7 L 69.3 222.5 L 68.4 224.2 L 67.5 225.1 L 66.6 226.9 L 65.8 227.7 L 64.9 227.7 L 64.0 221.6 L 63.1 208.4 Z",
    "M 87.8 26.1 L 88.6 27.0 L 89.5 28.8 L 90.4 29.6 L 91.3 31.4 L 92.2 32.3 L 93.0 34.0 L 93.9 34.9 L 94.8 36.7 L 95.7 38.4 L 96.6 39.3 L 97.4 41.0 L 98.3 42.8 L 99.2 44.5 L 100.1 46.3 L 101.0 48.9 L 101.8 51.6 L 102.7 55.9 L 102.7 208.4 L 101.8 212.0 L 101.0 213.7 L 100.1 215.5 L 99.2 218.1 L 98.3 219.8 L 97.4 221.6 L 96.6 223.3 L 95.7 224.2 L 94.8 226.0 L 93.9 227.7 L 93.0 229.5 L 92.2 230.4 L 91.3 232.1 L 90.4 233.0 L 89.5 233.9 L 88.6 235.6 L 87.8 234.7 Z",
    "M 106.2 32.3 L 107.1 23.5 L 108.0 22.6 L 108.9 22.6 L 109.8 24.4 L 110.6 25.3 L 111.5 26.1 L 112.4 27.9 L 113.3 28.8 L 114.2 29.6 L 115.0 30.5 L 115.9 32.3 L 116.8 33.1 L 117.7 34.9 L 118.6 35.8 L 119.4 37.5 L 120.3 39.3 L 121.2 41.0 L 122.1 43.7 L 123.0 45.4 L 123.8 41.9 L 124.7 35.8 L 125.6 31.4 L 126.5 27.0 L 127.4 23.5 L 128.2 20.0 L 129.1 20.0 L 130.0 20.9 L 130.9 21.8 L 131.8 22.6 L 132.6 23.5 L 133.5 24.4 L 134.4 25.3 L 135.3 27.0 L 136.2 27.9 L 137.0 28.8 L 137.9 30.5 L 138.8 32.3 L 139.7 34.0 L 140.6 36.7 L 141.4 38.4 L 142.3 41.9 L 143.2 48.9 L 143.2 212.8 L 142.3 218.1 L 141.4 220.7 L 140.6 223.3 L 139.7 224.2 L 138.8 226.0 L 137.9 227.7 L 137.0 229.5 L 136.2 230.4 L 135.3 232.1 L 134.4 233.0 L 133.5 233.9 L 132.6 235.6 L 131.8 236.5 L 130.9 237.4 L 130.0 238.2 L 129.1 239.1 L 128.2 240.0 L 127.4 240.0 L 126.5 236.5 L 125.6 232.1 L 124.7 225.1 L 123.8 212.8 L 123.0 214.6 L 122.1 217.2 L 121.2 219.0 L 120.3 221.6 L 119.4 223.3 L 118.6 225.1 L 117.7 226.0 L 116.8 227.7 L 115.9 229.5 L 115.0 230.4 L 114.2 232.1 L 113.3 233.0 L 112.4 234.7 L 111.5 235.6 L 110.6 237.4 L 109.8 238.2 L 108.9 237.4 L 108.0 233.0 L 107.1 226.9 L 106.2 219.0 Z"
  ];
  const domePath = "M 145.8 21.8 L 146.7 20.9 L 147.6 20.9 L 148.5 20.9 L 149.4 21.8 L 150.2 21.8 L 151.1 21.8 L 152.0 21.8 L 152.9 22.6 L 153.8 22.6 L 154.6 22.6 L 155.5 23.5 L 156.4 23.5 L 157.3 23.5 L 158.2 24.4 L 159.0 24.4 L 159.9 24.4 L 160.8 25.3 L 161.7 25.3 L 162.6 25.3 L 163.4 26.1 L 164.3 26.1 L 165.2 27.0 L 166.1 27.0 L 167.0 27.0 L 167.8 27.9 L 168.7 27.9 L 169.6 28.8 L 170.5 28.8 L 171.4 29.6 L 172.2 29.6 L 173.1 30.5 L 174.0 30.5 L 174.9 31.4 L 175.8 31.4 L 176.6 32.3 L 177.5 32.3 L 178.4 33.1 L 179.3 33.1 L 180.2 34.0 L 181.0 34.0 L 181.9 34.9 L 182.8 34.9 L 183.7 35.8 L 184.6 35.8 L 185.4 36.7 L 186.3 37.5 L 187.2 37.5 L 188.1 38.4 L 189.0 39.3 L 189.8 39.3 L 190.7 40.2 L 191.6 41.0 L 192.5 41.0 L 193.4 41.9 L 194.2 42.8 L 195.1 43.7 L 196.0 43.7 L 196.9 44.5 L 197.8 45.4 L 198.6 45.4 L 199.5 46.3 L 200.4 47.2 L 201.3 48.0 L 202.2 48.9 L 203.0 48.9 L 203.9 49.8 L 204.8 50.7 L 205.7 51.6 L 206.6 52.4 L 207.4 53.3 L 208.3 54.2 L 209.2 55.1 L 210.1 55.9 L 211.0 56.8 L 211.8 57.7 L 212.7 58.6 L 213.6 59.4 L 214.5 60.3 L 215.4 61.2 L 216.2 62.9 L 217.1 63.8 L 218.0 64.7 L 218.9 65.6 L 219.8 66.5 L 220.6 68.2 L 221.5 69.1 L 222.4 70.0 L 223.3 71.7 L 224.2 72.6 L 225.0 74.3 L 225.9 76.1 L 226.8 77.0 L 227.7 78.7 L 228.6 80.5 L 229.4 82.2 L 230.3 84.0 L 231.2 85.7 L 232.1 87.5 L 233.0 90.1 L 233.8 91.9 L 234.7 94.5 L 235.6 97.1 L 236.5 99.8 L 237.4 103.3 L 238.2 106.8 L 239.1 112.0 L 240.0 119.9 L 240.0 137.5 L 239.1 144.5 L 238.2 149.7 L 237.4 153.2 L 236.5 156.7 L 235.6 160.2 L 234.7 162.9 L 233.8 165.5 L 233.0 168.1 L 232.1 169.9 L 231.2 171.6 L 230.3 173.4 L 229.4 175.1 L 228.6 176.9 L 227.7 178.6 L 226.8 180.4 L 225.9 182.2 L 225.0 183.0 L 224.2 184.8 L 223.3 185.7 L 222.4 187.4 L 221.5 188.3 L 220.6 190.0 L 219.8 190.9 L 218.9 191.8 L 218.0 193.5 L 217.1 194.4 L 216.2 195.3 L 215.4 196.2 L 214.5 197.1 L 213.6 197.9 L 212.7 199.7 L 211.8 200.6 L 211.0 201.4 L 210.1 202.3 L 209.2 203.2 L 208.3 203.2 L 207.4 204.1 L 206.6 204.9 L 205.7 205.8 L 204.8 206.7 L 203.9 207.6 L 203.0 208.4 L 202.2 209.3 L 201.3 210.2 L 200.4 210.2 L 199.5 211.1 L 198.6 212.0 L 197.8 212.8 L 196.9 213.7 L 196.0 213.7 L 195.1 214.6 L 194.2 215.5 L 193.4 216.3 L 192.5 216.3 L 191.6 217.2 L 190.7 218.1 L 189.8 218.1 L 189.0 219.0 L 188.1 219.8 L 187.2 219.8 L 186.3 220.7 L 185.4 220.7 L 184.6 221.6 L 183.7 221.6 L 182.8 222.5 L 181.9 223.3 L 181.0 223.3 L 180.2 224.2 L 179.3 224.2 L 178.4 225.1 L 177.5 225.1 L 176.6 226.0 L 175.8 226.0 L 174.9 226.9 L 174.0 226.9 L 173.1 226.9 L 172.2 227.7 L 171.4 227.7 L 170.5 228.6 L 169.6 228.6 L 168.7 229.5 L 167.8 229.5 L 167.0 229.5 L 166.1 230.4 L 165.2 230.4 L 164.3 230.4 L 163.4 231.2 L 162.6 231.2 L 161.7 231.2 L 160.8 232.1 L 159.9 232.1 L 159.0 232.1 L 158.2 233.0 L 157.3 233.0 L 156.4 233.0 L 155.5 233.0 L 154.6 233.9 L 153.8 233.9 L 152.9 233.9 L 152.0 233.9 L 151.1 233.9 L 150.2 234.7 L 149.4 234.7 L 148.5 234.7 L 147.6 234.7 L 146.7 234.7 L 145.8 227.7 Z";

  return (
    <div style={{ display: "flex", alignItems: "center", gap: height * 0.34 }}>
      <svg
        height={height}
        viewBox="0 0 260 260"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0, overflow: "visible" }}
        aria-label="Munditel"
      >
        <style>{`
          @keyframes mun-wave {
            0%   { opacity: 0; transform: translateX(-10px); }
            100% { opacity: 1; transform: translateX(0); }
          }
          @keyframes mun-wave-loop {
            0%, 100% { opacity: 0.5; }
            50%      { opacity: 1; }
          }
          @keyframes mun-dome {
            0%   { opacity: 0; transform: scale(0.7); }
            100% { opacity: 1; transform: scale(1); }
          }
          .mun-slice { transform-box: fill-box; transform-origin: left center; }
          .mun-slice-once { opacity: 0; animation: mun-wave 0.5s ease forwards; }
          .mun-slice-loop { animation: mun-wave-loop 2.8s ease-in-out infinite; }
          .mun-dome-once {
            transform-box: fill-box; transform-origin: center;
            opacity: 0; animation: mun-dome 0.5s ease forwards;
          }
        `}</style>

        <defs>
          {/* Degradê azul exato da logo original: claro à esquerda → vibrante/escuro à direita */}
          <linearGradient id="munGrad" x1="0" y1="0" x2="1" y2="0.35">
            <stop offset="0%" stopColor="#9fd2ff" />
            <stop offset="35%" stopColor="#4da0ff" />
            <stop offset="70%" stopColor="#1a64f0" />
            <stop offset="100%" stopColor="#012da8" />
          </linearGradient>
          {/* Degradê do semicírculo (mais vibrante) */}
          <linearGradient id="munGradDome" x1="0.2" y1="0" x2="0.9" y2="1">
            <stop offset="0%" stopColor="#4da0ff" />
            <stop offset="50%" stopColor="#1a64f0" />
            <stop offset="100%" stopColor="#012da8" />
          </linearGradient>
        </defs>

        {slicePaths.map((d, i) => (
          <path
            key={i}
            d={d}
            fill="url(#munGrad)"
            className={`mun-slice ${animateOnce ? "mun-slice-once" : "mun-slice-loop"}`}
            style={
              animateOnce
                ? { animationDelay: `${i * 0.12}s` }
                : { animationDelay: `${i * 0.2}s` }
            }
          />
        ))}

        <path
          d={domePath}
          fill="url(#munGradDome)"
          className={animateOnce ? "mun-dome-once" : undefined}
          style={animateOnce ? { animationDelay: "0.66s" } : undefined}
        />
      </svg>

      {showText && (
        <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
          <span style={{ fontWeight: 700, fontSize: height * 0.6, letterSpacing: "-0.01em" }}>
            <span style={{ color: "#ffffff" }}>Mundi</span>
            <span style={{ color: "#1776eb" }}>tel</span>
          </span>
          {height >= 44 && (
            <span style={{ color: "#cbd5e1", fontSize: height * 0.142, letterSpacing: "0.2em", marginTop: height * 0.1, textTransform: "uppercase" }}>
              Connecting voices to the world
            </span>
          )}
        </div>
      )}
    </div>
  );
}
