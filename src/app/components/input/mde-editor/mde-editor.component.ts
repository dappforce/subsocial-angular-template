import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { BaseControlValueAccessorComponent } from '../../../core/base-component/base-value-accessor';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import sanitizeHtml from 'sanitize-html';

@Component({
  selector: 'app-mde-editor',
  templateUrl: './mde-editor.component.html',
  styleUrls: ['./mde-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MdeEditorComponent),
      multi: true,
    },
  ],
})
export class MdeEditorComponent
  extends BaseControlValueAccessorComponent
  implements OnInit, AfterViewInit, OnChanges
{
  @Input() placeholder: string = '';
  @Input() isToolbarHidden: boolean = true;
  @Input() autoFocus: boolean = false;
  @Input() isRequired: boolean = false;
  @Input() height: number = 20;
  @Output() focus = new EventEmitter();
  @Output() blur = new EventEmitter();
  @ViewChild('textarea') textArea: ElementRef;

  codemirror: HTMLElement;
  simplemde: any;

  constructor(
    @Inject(DOCUMENT) private doc: any,
    private renderer: Renderer2,
    private el: ElementRef
  ) {
    super();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.isRequired && !changes.isRequired.firstChange) {
      this.handleRequired();
    }
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initSimpleMDE();
    this.listenEvents();
    this.setHeight();
    this.handleRequired();
  }

  private initSimpleMDE() {
    if (this.isToolbarHidden && !this.autoFocus) {
      this.setInitView();
    }

    const element = <HTMLElement>this.textArea.nativeElement;
    const win = this._getWin();

    if (typeof win.SimpleMDE === 'undefined') {
      throw new Error(`Could not find SimpleMDE object.`);
    }

    this.simplemde = new win.SimpleMDE(this.getSettings(element));

    if (this.value) {
      this.simplemde.value(this.value);
    }
  }

  private listenEvents() {
    this.simplemde.codemirror.on('change', () => {
      // this.value = sanitizeHtml(this.simplemde.value());
      this.value = this.simplemde.value();
    });

    this.simplemde.codemirror.on('focus', () => {
      this.focus.emit();
    });

    this.simplemde.codemirror.on('blur', () => {
      this.blur.emit();
    });

    this.codemirror = this.getElementByClass('.CodeMirror-empty');

    if (this.codemirror) {
      this.renderer.listen(this.codemirror, 'click', () => {
        this.renderer.removeClass(this.el.nativeElement, 'init');
      });
    }
  }

  setInitView() {
    this.renderer.addClass(this.el.nativeElement, 'init');
  }

  writeValue(obj: any) {
    super.writeValue(obj);
    this.isToolbarHidden = !obj;
    this.simplemde?.value(obj || '');
  }

  private setHeight() {
    const codemirror = this.getElementByClass('.CodeMirror');
    const codemirrorScroll = this.getElementByClass('.CodeMirror-scroll');

    this.renderer.setStyle(codemirror, 'min-height', this.height + 'px');
    this.renderer.setStyle(codemirrorScroll, 'min-height', this.height + 'px');
  }

  private getSettings(element: HTMLElement) {
    return {
      element,
      placeholder: this.placeholder,
      status: false,
      autofocus: this.autoFocus,
      spellChecker: false,
      sanitizerFunction: (text: string) => sanitizeHtml(text),
    };
  }

  private getElementByClass(className: string) {
    return <HTMLElement>this.el.nativeElement.querySelector(className);
  }

  private _getWin(): any {
    return this.doc.defaultView || window;
  }

  private handleRequired() {
    const codemirror = this.getElementByClass('.CodeMirror');
    if (this.isRequired) {
      this.renderer.addClass(codemirror, 'required');
    } else {
      this.renderer.removeClass(codemirror, 'required');
    }
  }
}
