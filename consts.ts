type IBreakpoints = {
	value: number;
	shortName: string;
	name?: string;
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

export const breakpoints: IBreakpoints[] = [
	{
		name: 'small',
		shortName: 'xs',
		value: 0
	},
	{
		name: 'mobile',
		shortName: 'sm',
		value: 576
	},
	{
		name: 'fablet',
		shortName: 'md',
		value: 768
	},
	{
		name: 'tablet',
		shortName: 'lg',
		value: 992
	},
	{
		name: 'desktop',
		shortName: 'xl',
		value: 1200
	},
	{
		name: 'desktop-hd',
		shortName: 'hd',
		value: 1366
	},
	{
		name: 'desktop-wide',
		shortName: 'whd',
		value: 1440
	}
];

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
	'desktop-hd': 70,
	desktop: 70,
	fablet: 70,
	tablet: 70,
	mobile: 70
};
