import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
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
  icon?: string;
  href?: string;
};

@Component({
  selector: 'app-left-side-menu',
  templateUrl: './left-side-menu.component.html',
  styleUrls: ['./left-side-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeftSideMenuComponent implements OnInit, AfterViewInit {
  @Input() type: 'hover' | 'switch' = 'hover';
  @Output() backdropClick = new EventEmitter();
  @ViewChild('aside') aside: ElementRef;

  constructor(private renderer: Renderer2, private cd: ChangeDetectorRef) {}

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
      icon: 'subsocial-logo-icon',
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

  @HostListener('mouseenter') onEnter() {
    if (this.type === 'hover') {
      this.openMenu();
    }
  }

  @HostListener('mouseleave') onLeave() {
    if (this.type === 'hover') {
      this.closeMenu();
    }
  }

  ngAfterViewInit(): void {
    if (this.type === 'switch') {
      this.openMenu();
    }
  }

  openMenu() {
    this.renderer.removeClass(this.aside.nativeElement, 'close');
    this.renderer.addClass(this.aside.nativeElement, 'open');
  }

  closeMenu() {
    this.renderer.removeClass(this.aside.nativeElement, 'open');
    this.renderer.addClass(this.aside.nativeElement, 'close');
  }

  ngOnInit(): void {
    this.isOpen = this.type === 'hover';
  }
}
