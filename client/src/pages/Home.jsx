import { Link } from "react-router-dom";

export function Home() {
    return (
        <div className="container px-4 py-5" id="hanging-icons">
            <h2 className="pb-2 border-bottom">Paskutiniai darbo pasiulymai</h2>
            <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
                <div className="col d-flex align-items-start mb-4">
                    <div className="icon-square text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
                    </div>
                    <div>
                    <h3 className="fs-2 text-body-emphasis">Featured title</h3>
                    <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and probably just keep going until we run out of words.</p>
                    <Link href="/" className="btn btn-primary">
                        Primary button
                    </Link>
                    </div>
                </div>
                <div className="col d-flex align-items-start mb-4">
                    <div className="icon-square text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
                    </div>
                    <div>
                    <h3 className="fs-2 text-body-emphasis">Featured title</h3>
                    <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and probably just keep going until we run out of words.</p>
                    <Link href="/" className="btn btn-primary">
                        Primary button
                    </Link>
                    </div>
                </div>
                <div className="col d-flex align-items-start mb-4">
                    <div className="icon-square text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
                    </div>
                    <div>
                    <h3 className="fs-2 text-body-emphasis">Featured title</h3>
                    <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and probably just keep going until we run out of words.</p>
                    <Link href="/" className="btn btn-primary">
                        Primary button
                    </Link>
                    </div>
                </div>
                <div className="col d-flex align-items-start mb-4">
                    <div className="icon-square text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
                    </div>
                    <div>
                    <h3 className="fs-2 text-body-emphasis">Featured title</h3>
                    <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and probably just keep going until we run out of words.</p>
                    <Link href="/" className="btn btn-primary">
                        Primary button
                    </Link>
                    </div>
                </div>
                <div className="col d-flex align-items-start mb-4">
                    <div className="icon-square text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
                    </div>
                    <div>
                    <h3 className="fs-2 text-body-emphasis">Featured title</h3>
                    <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and probably just keep going until we run out of words.</p>
                    <Link href="/" className="btn btn-primary">
                        Primary button
                    </Link>
                    </div>
                </div>
                <div className="col d-flex align-items-start">
                    <div className="icon-square text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
                    </div>
                    <div>
                    <h3 className="fs-2 text-body-emphasis">Featured title</h3>
                    <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and probably just keep going until we run out of words.</p>
                    <Link href="/" className="btn btn-primary">
                        Primary button
                    </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}