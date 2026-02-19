import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

// Image metadata
export const size = {
    width: 32,
    height: 32,
};
export const contentType = "image/png";

// Image generation
export default function Icon() {
    return new ImageResponse(
        (
            <div
                style={{
                    fontSize: 24,
                    background: "#060914",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "20%",
                    border: "1px solid #c9a84c",
                }}
            >
                {/* Simple geometric Gem representation */}
                <div
                    style={{
                        width: "16px",
                        height: "16px",
                        background: "linear-gradient(135deg, #ffd700, #c9a84c)",
                        transform: "rotate(45deg)",
                        boxShadow: "0 0 10px rgba(201,168,76,0.5)",
                    }}
                />
            </div>
        ),
        {
            ...size,
        }
    );
}
