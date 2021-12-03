import {
  AfterContentInit,
  Directive,
  ElementRef,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[ifMobile]',
})
export class IfMobileDirective implements AfterContentInit {
  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  ngAfterContentInit(): void {
    this.renderer.addClass(this.elementRef.nativeElement, 'if-mobile');
  }
}
