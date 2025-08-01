import {
  transition,
  trigger,
  query,
  style,
  animate,
  group,
  stagger
} from '@angular/animations';


export const slideInAnimation =
  trigger('routeAnimations', [
    transition('Techs => Home', [
      query(':enter, :leave', style({ position: 'fixed', width: '100%', height: '100%' }), { optional: true }),
      group([
        query(':enter', [
          query('div > *', [
            style({ transform: 'translateY(-100%)', opacity: 0 }),
            stagger(100, [animate('1s ease-in-out', style({ transform: 'translateY(0%)', opacity: 1 }))])
          ])
        ], { optional: true }),
        query(':leave', [
          style({ transform: 'scale(1) translateX(0%)', opacity: 1 }),
          animate('0.25s ease-out', style({ transform: 'scale(0.7) translateX(50%) rotateX(-50deg)', opacity: 0 }))
        ], { optional: true }),
      ])
    ]),
    transition('About => Home', [
      query(':enter, :leave', style({ position: 'fixed', width: '100%', height: '100%' }), { optional: true }),
      group([
        query(':enter', [
          query('div > *', [
            style({ transform: 'translateY(-100%)', opacity: 0 }),
            stagger(100, [animate('1s ease-in-out', style({ transform: 'translateY(0%)', opacity: 1 }))])
          ])
        ], { optional: true }),
        query(':leave', [
          style({ transform: 'scale(1) translateX(0%)', opacity: 1 }),
          animate('0.25s ease-out', style({ transform: 'scale(0.7) translateX(-50%) rotateX(-50deg)', opacity: 0 }))
        ], { optional: true }),
      ])
    ]),
    transition('Projects => Home', [
      query(':enter, :leave', style({ position: 'fixed', width: '100%', height: '100%' }), { optional: true }),
      group([
        query(':enter', [
          query('div > *', [
            style({ transform: 'translateY(-100%)', opacity: 0 }),
            stagger(100, [animate('1s ease-in-out', style({ transform: 'translateY(0%)', opacity: 1 }))])
          ])
        ], { optional: true }),
        query(':leave', [
          style({ transform: 'scale(1) translateX(0%)', opacity: 1 }),
          animate('0.25s ease-out', style({ transform: 'scale(0.7) translateX(-50%) rotateX(-50deg)', opacity: 0 }))
        ], { optional: true }),
      ])
    ]),
    transition('* => About', [
      query(':enter, :leave', style({ position: 'fixed', width: '100%', height: '100%' }), { optional: true }),
      group([
        query(':enter', [
          group([
            query('.contact-container > div > * , .nav-container > *', [
              style({ opacity: '0' })
            ]),
            style({ transform: 'scale(0.7) translateX(-50%) rotateX(-50deg)', opacity: 0 }),
            animate('0.65s ease-in-out', style({ transform: 'scale(1) translateX(0%)', opacity: 1 })),
            query('.contact-container > div > * , .nav-container > *', [
              style({ opacity: '0', transform: 'translateY(5%)' }),
              stagger(150, [animate('0.5s 1s ease-in-out', style({ opacity: 1, transform: 'translateY(0%)' }))])
            ])
          ])
        ], { optional: true }),
        query(':leave', [
          style({ transform: 'scale(1) translateX(0%)', opacity: 1 }),
          animate('0.2s ease-in-out', style({ transform: 'scale(1) translateX(50%)', opacity: 0 }))
        ], { optional: true }),
      ])
    ]),
    transition('* => Projects', [
      query(':enter, :leave', style({ position: 'fixed', height: '100%', width: '100%' }), { optional: true }),
      group([
        query(':enter', [
          query('div > *', [
            style({ opacity: 0 })
          ]),
          group([
            style({ transform: 'translateY(100%)', opacity: 0 }),
            animate('1s ease-in-out', style({ transform: 'translateY(0%)', opacity: 1 })),
            query('div > *', [
              style({ transform: 'translateY(20%)', opacity: 0 }),
              stagger(50, [animate('0.5s 0.5s ease-in-out', style({ transform: 'translateY(0%)', opacity: 1 }))])
            ], { optional: false })
          ]),
        ], { optional: true }),
        query(':leave', [
          style({ transform: 'translateY(0%)', opacity: 1 }),
          animate('0.65s ease-in-out', style({ transform: 'translateY(-100%)', opacity: 0 }))
        ], { optional: true }),
      ])
    ]),
    transition('* => Techs', [
      query(':enter, :leave', style({ position: 'fixed', height: '100%', width: '100%' }), { optional: true }),
      group([
        query(':enter', [
          group([
            query('.content-container > * , .nav-container > *', [
              style({ opacity: '0' })
            ]),
            style({ transform: 'scale(0.7) translateX(50%) rotateX(-50deg)', opacity: 0 }),
            animate('0.65s ease-in-out', style({ transform: 'scale(1) translateX(0%)', opacity: 1 })),
            query('.content-container > * , .nav-container > *', [
              style({ opacity: '0', transform: 'translateY(5%)' }),
              stagger(150, [animate('0.5s 1s ease-in-out', style({ opacity: 1, transform: 'translateY(0%)' }))])
            ])
          ])
        ], { optional: true }),
        query(':leave', [
          style({ transform: 'scale(1) translateX(0%)', opacity: 1 }),
          animate('0.2s ease-in-out', style({ transform: 'scale(1) translateX(-50%)', opacity: 0 }))
        ], { optional: true }),
      ])
    ])
  ]);
