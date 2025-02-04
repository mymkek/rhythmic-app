

type RouteInfo = {
    path: string,
    label: string,
}

export const routes: RouteInfo[] = [
    { path: '/', label: 'Home' },
    { path: '/chords', label: 'Chords' },
    { path: '/scales', label: 'Scales' },
    { path: '/circle-of-fifths', label: 'Circle of fifths' },
    { path: '/recognize-notes', label: 'Recognize Notes' },
    { path: '/rhythm-trainer', label: 'Rhythm Trainer' },
];
