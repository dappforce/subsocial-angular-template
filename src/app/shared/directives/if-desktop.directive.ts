import {
  AfterContentInit,
  Directive,
  ElementRef,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[ifDesktop]',
})
export class IfDesktopDirective implements AfterContentInit {
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngAfterContentInit(): void {
    this.renderer.addClass(this.elementRef.nativeElement, 'if-desktop');
  }
}
