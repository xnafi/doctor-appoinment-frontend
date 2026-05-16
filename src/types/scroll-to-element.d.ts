declare module "scroll-to-element" {
    interface ScrollToElementOptions {
        offset?: number;
        ease?: string;
        duration?: number;
    }

    export default function scrollToElement(
        target: string | Element,
        options?: ScrollToElementOptions
    ): void;
}
