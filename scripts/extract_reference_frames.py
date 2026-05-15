"""Extract PNG frames from WUJUD screen capture for visual reference."""
from __future__ import annotations

from pathlib import Path

import imageio.v2 as imageio


def main() -> None:
	caps = sorted(Path(r"C:\Users\altob\Videos\Captures").glob("WUJUD*.mp4"))
	if not caps:
		raise SystemExit("No WUJUD*.mp4 in Videos/Captures")
	video_path = caps[0]

	root = Path(__file__).resolve().parents[1]
	out = root / "public" / "reference" / "frames"
	out.mkdir(parents=True, exist_ok=True)

	reader = imageio.get_reader(str(video_path), "ffmpeg")
	meta = reader.get_meta_data()
	fps = float(meta.get("fps") or 30)
	dur = float(meta.get("duration") or 0)
	nf = reader.count_frames()
	print("fps", fps, "duration", dur, "frames", nf)

	times_s = [0, 0.5, 1, 1.5, 2, 3, 4, 5, 7, 10, 15, 20, 30, 45, 60, 90, 120]
	for t in times_s:
		if dur > 0 and t > dur + 0.5:
			continue
		idx = min(int(t * fps), max(nf - 1, 0))
		img = reader.get_data(idx)
		name = "ref_t" + str(t).replace(".", "_") + "s.png"
		imageio.imwrite(out / name, img)
		print("wrote", name, "idx", idx)
	reader.close()
	print("frames dir:", out)


if __name__ == "__main__":
	main()
