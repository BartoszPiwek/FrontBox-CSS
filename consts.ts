type IBreakpoints = {
	[key: string]: {
		value: number;
		shortName: string;
		name?: string;
	};
};

type IBreakpointsSpecial = {
	[key: string]: {
		value: number;
		cssValue: string;
	};
};

type IResponsiveElementsHeight = {
	[key: string]: number;
};

export const breakpoints: IBreakpoints = {
	small: {
		shortName: 'xs',
		value: 0
	},
	mobile: {
		shortName: 'sm',
		value: 576
	},
	fablet: {
		shortName: 'md',
		value: 768
	},
	tablet: {
		shortName: 'lg',
		value: 992
	},
	desktop: {
		shortName: 'xl',
		value: 1200
	},
	desktopHd: {
		shortName: 'hd',
		name: 'desktop-hd',
		value: 1366
	},
	desktopWide: {
		shortName: 'whd',
		name: 'desktop-wide',
		value: 1440
	}
};

export const breakpointsSpecial: IBreakpointsSpecial = {
	burgerShow: {
		cssValue: 'screen and (max-width: 767px)',
		value: 767
	},
	burgerHide: {
		cssValue: 'screen and (min-width: 768px)',
		value: 768
	}
};

export const headerHeight: IResponsiveElementsHeight = {
	desktop: 70,
	fablet: 70,
	tablet: 70,
	mobile: 70
};
