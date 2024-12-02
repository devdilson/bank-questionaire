const Footer = () => {
    return <footer className="fixed bottom-0 left-0 right-0 bg-gray-900 text-gray-300 py-6">
    <div className="container mx-auto px-4">
        <div className="grid grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div>
                    <h4 className="text-white font-semibold mb-2">Contact</h4>
                    <p className="text-sm">1-800-SECURE</p>
                    <p className="text-sm">contact@securebank.com</p>
                </div>

                <div>
                    <h4 className="text-white font-semibold mb-2">Services</h4>
                    <p className="text-sm">Personal Banking</p>
                    <p className="text-sm">Business Banking</p>
                </div>
            </div>
        </div>
    </footer>
}

export default Footer;