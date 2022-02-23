import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { LINKS } from '../../../core/constants/links.const';

type MenuItem = {
  type: 'item' | 'divider' | 'icon';
  className: string;
  title?: string;
  image?: string;
  icon?: string;
  href?: string;
};

@Component({
  selector: 'app-left-side-menu',
  templateUrl: './left-side-menu.component.html',
  styleUrls: ['./left-side-menu.component.scss'],
  animations: [
    trigger('slideInOut', [
      state(
        'in',
        style({
          width: '230px',
        })
      ),
      state(
        'mobile-out',
        style({
          width: '0px',
        })
      ),
      state(
        'desktop-out',
        style({
          width: '54px',
        })
      ),
      transition('in => mobile-out', animate('300ms ease-in-out')),
      transition('in => desktop-out', animate('300ms ease-in-out')),
      transition('mobile-out => in', animate('300ms ease-in-out')),
      transition('desktop-out => in', animate('300ms ease-in-out')),
    ]),
  ],
})
export class LeftSideMenuComponent implements OnInit {
  @Input() type: 'hover' | 'switch' = 'hover';
  @Output() backdropClick = new EventEmitter();
  @ViewChild('aside') aside: ElementRef;

  innerHeight = window.innerHeight - 56;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    document.documentElement.style.setProperty(
      '--window-inner-height',
      `${event.target.innerHeight}px`
    );
    this.innerHeight = event.target.innerHeight - 56;
  }

  @HostListener('pointermove', ['$event'])
  pointerMove(event: any) {
    if (this.isMobileOpen) {
      event.preventDefault();
    }
  }

  menuStatus: string;

  constructor() {}

  menuItems: MenuItem[] = [
    {
      type: 'item',
      title: 'React app',
      icon: 'react-icon',
      href: LINKS.reactApp,
      className: '',
    },
    {
      type: 'item',
      title: 'Vue app',
      icon: 'vue-icon',
      href: LINKS.vueApp,
      className: '',
    },
    {
      type: 'divider',
      className: '',
    },
    {
      type: 'item',
      title: 'Subsocial app',
      image: 'subsocial-logo.png',
      href: LINKS.subsocialApp,
      className: '',
    },
    {
      type: 'item',
      title: 'Landing page',
      icon: 'world-icon',
      href: LINKS.vueApp,
      className: 'icon-primary-hover',
    },
    {
      type: 'item',
      title: 'Legal Documents',
      icon: 'documents-icon',
      href: LINKS.github,
      className: 'icon-primary-hover',
    },
    {
      type: 'item',
      title: 'Github',
      icon: 'github-ls-icon',
      href: LINKS.github,
      className: 'icon-primary-hover',
    },
    {
      type: 'item',
      title: 'What is Subsocial?',
      icon: 'question-icon',
      href: '',
      className: 'icon-primary-hover',
    },
  ];

  iconItems: MenuItem[] = [
    {
      type: 'icon',
      icon: 'twitter-icon',
      href: LINKS.twitter,
      className: '',
    },
    {
      type: 'icon',
      icon: 'discord-icon',
      href: LINKS.discord,
      className: '',
    },
    {
      type: 'icon',
      icon: 'telegram-icon',
      href: LINKS.telegram,
      className: '',
    },
    {
      type: 'icon',
      icon: 'megaphone-icon',
      href: LINKS.megaphone,
      className: '',
    },
  ];

  isOpen: boolean;
  isMobileOpen: boolean;

  @HostListener('mouseenter') onEnter() {
    if (this.type === 'hover') {
      this.menuStatus = 'in';
    }
  }

  @HostListener('mouseleave') onLeave() {
    if (this.type === 'hover') {
      this.menuStatus = 'desktop-out';
    }
  }

  ngOnInit(): void {
    this.isOpen = this.type === 'hover';
    this.menuStatus = this.type === 'switch' ? 'mobile-out' : 'desktop-out';
  }

  mobileSwitchState(state: boolean) {
    this.menuStatus = state ? 'in' : 'mobile-out';
    this.isMobileOpen = state;
  }

  onBackdropClick() {
    this.backdropClick.emit();
    this.menuStatus = 'mobile-out';
  }
}
