import React, { useState, useEffect, useRef, useCallback } from "react";

interface PlinkoBoardProps {
  rows: number;
  multipliers: number[];
  dropBallTrigger: boolean;
  setDropBallTrigger: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Peg {
  x: number;
  y: number;
}

const PlinkoBoard = ({
  rows,
  multipliers,
  dropBallTrigger,
  setDropBallTrigger,
}: PlinkoBoardProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [pegs, setPegs] = useState<{ x: number; y: number }[]>([]);
  const ACTIVE_TIMEOUT = 5000;
  const BOARD_PADDING_TOP = 15;
  const BOARD_PADDING_BOTTOM = 10;
  const CANVAS_WIDTH = 550;
  const CANVAS_HEIGHT = 430;
  const BOARD_HEIGHT = 400;
  const PEG_SIZE = 14;
  const PEG_SCALE = 2;
  const BALL_RADIUS = rows === 8 ? 7 : 6;
  const [hoveredMultiplier, setHoveredMultiplier] = useState<number | null>(
    null
  );
  const [countdowns, setCountdowns] = useState(
    new Array(multipliers.length).fill(0)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdowns((prevCountdowns) =>
        prevCountdowns.map((count) => (count > 0 ? count - 500 : 0))
      );
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const handleBallLanding = (multiplierIndex: number) => {
    setCountdowns((prevCountdowns) => {
      const newCountdowns = [...prevCountdowns];
      newCountdowns[multiplierIndex] = 400;
      return newCountdowns;
    });
  };

  const drawBoard = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      rows: number,
      defaultImg: HTMLImageElement,
      activeImg: HTMLImageElement,
      hitPegs: Array<{ pegIndex: number; time: number }>
    ) => {
      console.log("Drawing with ", rows, " rows.");
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      const spacingX = ctx.canvas.width / (rows + 1);
      const spacingY =
        (BOARD_HEIGHT - BOARD_PADDING_BOTTOM - BOARD_PADDING_TOP) / rows;
      const pegs = [];
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j <= i; j++) {
          const x = Math.round(
            (j + 1) * spacingX + ((rows - i - 1) * spacingX) / 2 - PEG_SIZE / 2
          );
          const y = Math.round(
            (i + 1) * spacingY + BOARD_PADDING_TOP - PEG_SIZE / 2
          );

          drawPeg(ctx, { x, y }, defaultImg, 1);
          const hitPeg = hitPegs.find((peg) => peg.pegIndex == pegs.length);
          if (hitPeg) {
            drawPeg(ctx, { x, y }, activeImg, hitPeg.time / ACTIVE_TIMEOUT);
          }
          pegs.push({ x, y });
        }
      }
      return pegs;
    },
    [BOARD_HEIGHT, BOARD_PADDING_BOTTOM, BOARD_PADDING_TOP, PEG_SIZE, rows]
  );

  const drawPeg = (
    ctx: CanvasRenderingContext2D,
    peg: Peg,
    img: HTMLImageElement,
    opacity: number
  ) => {
    ctx.save();

    ctx.globalAlpha = opacity;

    ctx.drawImage(img, peg.x, peg.y, PEG_SIZE, PEG_SIZE);
    ctx.restore();
  };

  const drawBall = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    radius: number
  ) => {
    if (!isFinite(x) || !isFinite(y) || !isFinite(radius)) {
      return;
    }

    ctx.beginPath();
    ctx.arc(x, y, radius + 2.5, 0, 2 * Math.PI);
    const gradient = ctx.createRadialGradient(x, y, radius, x, y, radius + 2.5);
    gradient.addColorStop(0, "rgba(255, 255, 255, 0.8)");
    gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
    ctx.fillStyle = gradient;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
  };

  useEffect(() => {
    console.log("Rows changed: ", rows);
    const canvas = canvasRef.current;
    if (canvas === null) {
      return;
    }
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return;
    }

    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
    const defaultImg = new Image();
    const activeImg = new Image();
    defaultImg.src = "/zlinko/zlinko-peg-default.png";
    activeImg.src = "/zlinko/zlinko-peg-active.png";

    Promise.all([
      new Promise((resolve) => (defaultImg.onload = resolve)),
      new Promise((resolve) => (activeImg.onload = resolve)),
    ]).then(() => {
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      const newPegs = drawBoard(ctx, rows, defaultImg, activeImg, new Array());
      setPegs(newPegs);
      console.log("Rows changed: ", rows);
    });
  }, [rows, drawBoard]);

  useEffect(() => {
    if (dropBallTrigger) {
      dropBall();
    }
  }, [dropBallTrigger]);

  const updateHitPegs = (
    hitPegs: Array<{ pegIndex: number; time: number }>
  ): Array<{ pegIndex: number; time: number }> => {
    const decrementAmount = 30;
    const newArray = hitPegs
      .map((peg) => ({
        ...peg,
        time: peg.time > 0 ? Math.max(peg.time - decrementAmount, 0) : 0,
      }))
      .filter((peg) => peg.time > 0);

    return newArray;
  };

  const dropBall = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const defaultImg = new Image();
    const activeImg = new Image();
    defaultImg.src = "/zlinko/zlinko-peg-default.png";
    activeImg.src = "/zlinko/zlinko-peg-active.png";

    Promise.all([
      new Promise((resolve) => (defaultImg.onload = resolve)),
      new Promise((resolve) => (activeImg.onload = resolve)),
    ]).then(() => {
      let x = canvas.width / 2;
      let y = BOARD_PADDING_TOP;
      let row = 0;
      let pegIndex = 0;
      const g = 250;
      const totalTime = 1;
      const v0 =
        (BOARD_HEIGHT - BOARD_PADDING_TOP - BOARD_PADDING_BOTTOM) /
          rows /
          totalTime -
        (g * totalTime) / 2;

      const trajectory = Array.from({ length: rows }, () =>
        Math.random() < 0.5 ? 0 : 1
      );

      const dropY = y;

      const moveToFirstPeg = (t: number) => {
        return {
          y: dropY + (pegs[0].y - dropY) * t + 0.5 * g * t * t,
        };
      };

      let t = 0;

      let hitPegs = new Array<{ pegIndex: number; time: number }>();

      const animateToFirstPeg = () => {
        if (y < pegs[0].y) {
          t += 0.05;
          const { y: py } = moveToFirstPeg(t);
          y = py;

          ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
          drawBoard(ctx, rows, defaultImg, activeImg, hitPegs);
          drawBall(ctx, x, y, BALL_RADIUS);
          requestAnimationFrame(animateToFirstPeg);
        } else {
          y = pegs[0].y;
          hitPegs.push({ pegIndex: 0, time: ACTIVE_TIMEOUT });
          requestAnimationFrame(animate);
        }
      };

      const animate = () => {
        pegIndex = pegIndex + (row + 1) + trajectory[row];

        if (row < rows) {
          const nextX =
            x +
            ((CANVAS_WIDTH / (rows + 1)) * (trajectory[row] === 0 ? -1 : 1)) /
              2;

          const initialY = y;
          const initialX = x;

          const parabola = (t: number) => {
            return {
              x: initialX + ((nextX - initialX) * t) / totalTime,
              y: initialY + v0 * t + 0.5 * g * t * t,
            };
          };

          let t = 0;

          const step = () => {
            hitPegs = updateHitPegs(hitPegs);
            if (t < totalTime) {
              t += 0.05;
              const { x: px, y: py } = parabola(t);
              x = px;
              y = py;

              ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
              drawBoard(ctx, rows, defaultImg, activeImg, hitPegs);
              drawBall(ctx, x, y, BALL_RADIUS);
              requestAnimationFrame(step);
            } else {
              if (pegIndex < pegs.length) {
                hitPegs.push({ pegIndex: pegIndex, time: ACTIVE_TIMEOUT });
                y = pegs[pegIndex].y;
              }
              ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
              drawBoard(ctx, rows, defaultImg, activeImg, hitPegs);
              drawBall(ctx, x, y, BALL_RADIUS);

              row++;
              x = nextX;
              requestAnimationFrame(animate);
            }
          };
          step();
        } else {
          handleBallLanding(
            trajectory.reduce<number>((sum, value) => sum + value, 0) %
              multipliers.length
          );

          const emptyHitPegs = () => {
            hitPegs = updateHitPegs(hitPegs);
            drawBoard(ctx, rows, defaultImg, activeImg, hitPegs);
            if (hitPegs.length > 0) {
              console.log(hitPegs);
              requestAnimationFrame(emptyHitPegs);
            }
          };
          emptyHitPegs();

          setTimeout(() => {
            ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

            drawBoard(ctx, rows, defaultImg, activeImg, hitPegs);
            setDropBallTrigger(false);
          }, 50);
        }
      };

      animateToFirstPeg();
    });
  };

  const getMultiplierStyle = (
    multiplier: number,
    index: number,
    total: number
  ) => {
    if (multiplier === 4.7) {
      return "bg-gradient-to-b from-green-500 to-green-400";
    } else if (multiplier === 2.3) {
      return "bg-gradient-to-b from-lime-500 to-green-400";
    } else if (index === 0 || index === total - 1) {
      return "bg-gradient-to-b from-green-600 to-green-500";
    } else if (multiplier > 1) {
      return "bg-gradient-to-b from-[#eab308] to-[#facc15]"; //yellow-500 to yellow-400
    } else if (multiplier === 1) {
      return "bg-gradient-to-b from-[#facc15] to-[#fbbf24]"; //yellow-400 to orange-400
    } else {
      return "bg-gradient-to-b from-orange-500 to-orange-400";
    }
  };

  const winChances = new Map<number, number>([
    [4.7, 0.390625],
    [2.3, 3.125],
    [1.2, 10.9375],
    [1, 12.5],
    [0.4, 37.5],
  ]);

  const getWinChance = (multiplier: number): number => {
    return winChances.get(multiplier) || 0;
  };

  return (
    <div
      className="rounded-sm flex flex-col justify-center relative max-w-full mx-auto max-h-[350px] md:max-h-full"
      style={{
        height: `${CANVAS_HEIGHT}px`,
        width: `${CANVAS_WIDTH}px`,
        backgroundImage: "url('/black-pattern.png')",
        backgroundSize: "auto",
        backgroundRepeat: "repeat",
      }}
    >
      <div className="flex justify-center">
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          className="rounded-t-lg max-w-full"
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </div>
      <div className="flex justify-evenly rounded-sm pb-2 px-1 relative">
        {multipliers.map((multiplier, index) => (
          <div
            key={index}
            className={`relative text-center px-1 py-1 md:px-3 md:py-2 rounded-md ${getMultiplierStyle(multiplier, index, multipliers.length)} transition-all duration-300 ${countdowns[index] > 0 ? "translate-y-[5px]" : ""}`}
            style={{
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              minWidth: "40px",
            }}
            onMouseEnter={() => setHoveredMultiplier(multiplier)}
            onMouseLeave={() => setHoveredMultiplier(null)}
          >
            <div
              className="text-sm font-bold relative z-10 cursor-default"
              style={{ color: multiplier < 1 ? "white" : "#4a5568" }}
            >
              {multiplier}x
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-black bg-opacity-20 rounded-b-md"></div>
          </div>
        ))}
        {hoveredMultiplier && (
          <div
            className="absolute left-1/2 transform -translate-x-1/2 bg-gray-800 text-white rounded-md shadow-lg"
            style={{
              bottom: "calc(100% + 8px)",
              width: "340px",
              maxWidth: "100%",
            }}
          >
            <div className="flex justify-between p-2 text-xs text-light-gray bg-dark-gray rounded-sm">
              <div className="flex-1 text-center">PROFIT ON WIN</div>
              <div className="flex-1 text-center">WIN CHANCE</div>
            </div>
            <div className="flex justify-between bg-gray text-light-green rounded-sm h-[35px] md:h-[65px]">
              <div className="flex-1 text-center py-2 px-3 md:mt-3">
                <div className="text-md font-bold">
                  ${(hoveredMultiplier - 1).toFixed(2)}
                </div>
              </div>
              <div className="flex-1 text-center py-2 px-3 md:mt-3">
                <div className="text-md font-bold">
                  {getWinChance(hoveredMultiplier).toFixed(6)}%
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlinkoBoard;