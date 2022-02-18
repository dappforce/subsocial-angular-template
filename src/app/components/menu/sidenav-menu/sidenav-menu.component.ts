import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { SnackBarService } from '../../../shared/services/snack-bar.service';
import { KeyValuePair } from '../../../core/models/key-value-pair.model';
import { StorageService } from '../../../shared/services/storage.service';
import { SideNavService } from '../../../shared/services/side-nav.service';
import { I18NEXT_SERVICE, ITranslationService } from 'angular-i18next';
import { AVAILABLE_LANGUAGE } from '../../../locale/i18next.config';

const LANG_LABELS: KeyValuePair<string> = {
  en: 'English',
  ru: 'Русский',
};

type LanguageMenuItem = {
  id: string;
  label: string;
  isActive: boolean;
};

@Component({
  selector: 'app-sidenav-menu',
  templateUrl: './sidenav-menu.component.html',
  styleUrls: ['./sidenav-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavMenuComponent implements OnInit {
  @Input() profileId: string;
  currentLanguage: string;
  availableLanguage: LanguageMenuItem[] = [];
  isLangMenuOpen: boolean;

  constructor(
    private snackBarService: SnackBarService,
    private storageService: StorageService,
    public sideNavService: SideNavService,
    public cd: ChangeDetectorRef,
    @Inject(I18NEXT_SERVICE) private i18NextService: ITranslationService
  ) {}

  ngOnInit(): void {
    const lang = this.i18NextService.language;
    const availableLang = AVAILABLE_LANGUAGE;
    this.currentLanguage = LANG_LABELS[lang];

    availableLang.map((id) => {
      this.availableLanguage.push({
        id: id,
        label: LANG_LABELS[id],
        isActive: id === lang,
      });
    });
  }

  async selectMenu(lang: LanguageMenuItem) {
    await this.i18NextService.changeLanguage(lang.id);
    this.currentLanguage = lang.label;
    this.availableLanguage = this.availableLanguage.map((langItem) => ({
      id: langItem.id,
      label: langItem.label,
      isActive: lang.id === langItem.id,
    }));
    this.storageService.setLang(lang.id);
    this.cd.markForCheck();
  }

  onSettings() {
    this.snackBarService.openSimpleSnackBar({
      message: 'Settings must be implemented',
      iconName: 'info-icon',
      isShowCloseButton: true,
      duration: 6000,
    });
  }
}
