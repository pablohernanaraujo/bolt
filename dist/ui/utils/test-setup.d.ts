import '@testing-library/jest-dom';
declare global {
    namespace Vi {
        interface Assertion<T = any> {
            toHaveNoViolations(): T;
            toHaveNoHydrationMismatch(): T;
            toBeServerComponent(): T;
            toBeClientComponent(): T;
            toRenderStatically(): T;
        }
        interface AsymmetricMatchersContaining {
            toHaveNoViolations(): any;
            toHaveNoHydrationMismatch(): any;
            toBeServerComponent(): any;
            toBeClientComponent(): any;
            toRenderStatically(): any;
        }
    }
    var __SSR_TEST__: boolean;
    var __RSC_TEST__: boolean;
    var __NEXT_TEST_MODE: string;
}
