import { render } from "@testing-library/react";
import { Message } from "../Message";

describe("Message tests", () => {
    it("renders author and text", () => {
        const message = render(<Message message={{ text: "messagetext", author: "author" }} />);

        const msgText = message.getByText("messagetext");
        const authorText = message.getByText("author:");
        expect(msgText).toBeInTheDocument();
        expect(authorText).toBeInTheDocument();
    });

    it("matches snapshot with author", () => {
        const message = render(<Message message={{ text: "messagetext", author: "author" }} />);

        expect(message).toMatchSnapshot();
    });
    it("matches snapshot with no author", () => {
        const message = render(<Message message={{ text: "messagetext", author: "" }} />);

        expect(message).toMatchSnapshot();
    });
});