import { base, container, responsive, presets, objectFit } from './aspect-ratio.css.js';

const calculateAspectRatio = (ratio) => `${ratio.width} / ${ratio.height}`;
const calculateFallbackPadding = (ratio) => {
    const percentage = (ratio.height / ratio.width) * 100;
    return `${percentage}%`;
};
const getAspectRatioValue = (preset, ratio) => {
    if (ratio) {
        return calculateAspectRatio(ratio);
    }
    const presetMap = {
        square: '1 / 1',
        video: '16 / 9',
        photo: '4 / 3',
        classic: '3 / 2',
        cinema: '21 / 9',
        portrait: '3 / 4',
        golden: '1.618 / 1',
    };
    return preset ? presetMap[preset] : undefined;
};
const buildAspectRatioClassName = ({ preset, objectFit: objectFit$1 = 'cover', className, }) => {
    const classNames = [base, container, responsive];
    if (preset && preset in presets) {
        classNames.push(presets[preset]);
    }
    if (objectFit$1 && objectFit$1 in objectFit) {
        classNames.push(objectFit[objectFit$1]);
    }
    if (className) {
        classNames.push(className);
    }
    return classNames.join(' ');
};
const createAspectRatioStyles = (preset, ratio) => {
    const aspectRatioValue = getAspectRatioValue(preset, ratio);
    if (!aspectRatioValue) {
        return {};
    }
    let fallbackPadding = '100%';
    if (ratio) {
        fallbackPadding = calculateFallbackPadding(ratio);
    }
    else if (preset) {
        const fallbackMap = {
            square: '100%',
            video: '56.25%',
            photo: '75%',
            classic: '66.67%',
            cinema: '42.86%',
            portrait: '133.33%',
            golden: '61.8%',
        };
        fallbackPadding = fallbackMap[preset] || '100%';
    }
    return {
        '--aspect-ratio': aspectRatioValue,
        '--fallback-padding': fallbackPadding,
    };
};

export { buildAspectRatioClassName, calculateAspectRatio, calculateFallbackPadding, createAspectRatioStyles, getAspectRatioValue };
//# sourceMappingURL=helpers.js.map
