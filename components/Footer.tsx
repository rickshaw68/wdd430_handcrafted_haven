import Image from "next/image";

export default function Footer() {
    return (
        <footer className="mt-12 border-t bg-gray-100 px-6 py-8 text-center text-sm text-gray-700">
            <div className="mx-auto max-w-6xl">
                <h2 className="text-lg font-semibold">Handcrafted Haven</h2>
                <p className="mt-2">Connecting artisans and shoppers</p>
                <div className="mt-4 flex justify-center gap-4 ">
                    <Image 
                        src="/images/social/facebook.png"
                        alt="Facebook"
                        width={32}
                        height={32}
                    />
                    <Image
                        src="/images/social/twitter.png"
                        alt="Twitter"
                        width={32}
                        height={32}
                    />
                    <Image 
                        src="/images/social/linkedin.png"
                        alt="LinkedIn"
                        width={32}
                        height={32}
                    />
                </div>

            <div className="mt-4">
                <p>info@handcraftedhaven.com</p>
            </div>

            </div>
        </footer>
    )
}