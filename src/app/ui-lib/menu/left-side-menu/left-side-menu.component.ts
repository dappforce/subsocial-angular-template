import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { LINKS } from '../../../core/constants/links.const';

type MenuItem = {
  type: 'item' | 'divider' | 'icon';
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
export class LeftSideMenuComponent implements OnInit {
  @ViewChild('aside') aside: ElementRef;

  constructor(private renderer: Renderer2) {}

  menuItems: MenuItem[] = [
    {
      type: 'item',
      title: 'React app',
      icon: 'react-icon',
      href: LINKS.reactApp,
    },
    {
      type: 'item',
      title: 'Vue app',
      icon: 'vue-icon',
      href: LINKS.vueApp,
    },
    {
      type: 'divider',
    },
    {
      type: 'item',
      title: 'Subsocial app',
      icon: 'subsocial-logo-icon',
      href: LINKS.subsocialApp,
    },
    {
      type: 'item',
      title: 'Landing page',
      icon: 'world-icon',
      href: LINKS.vueApp,
    },
    {
      type: 'item',
      title: 'Legal Documents',
      icon: 'documents-icon',
      href: LINKS.github,
    },
    {
      type: 'item',
      title: 'Github',
      icon: 'github-ls-icon',
      href: LINKS.github,
    },
    {
      type: 'item',
      title: 'What is Subsocial?',
      icon: 'question-icon',
      href: '',
    },
  ];

  iconItems: MenuItem[] = [
    {
      type: 'icon',
      icon: 'twitter-icon',
      href: LINKS.twitter,
    },
    {
      type: 'icon',
      icon: 'discord-icon',
      href: LINKS.discord,
    },
    {
      type: 'icon',
      icon: 'telegram-icon',
      href: LINKS.telegram,
    },
    {
      type: 'icon',
      icon: 'megaphone-icon',
      href: LINKS.megaphone,
    },
  ];

  isOpen: boolean;

  //TODO: use angular animation

  @HostListener('mouseenter') onEnter() {
    this.renderer.removeClass(this.aside.nativeElement, 'close');
    this.renderer.addClass(this.aside.nativeElement, 'open');
  }

  @HostListener('mouseleave') onLeave() {
    this.renderer.removeClass(this.aside.nativeElement, 'open');
    this.renderer.addClass(this.aside.nativeElement, 'close');
  }

  ngOnInit(): void {}
}
