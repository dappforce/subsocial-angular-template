import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AvailableLangs, TranslocoService } from '@ngneat/transloco';
import { SnackBarService } from '../../../shared/services/snack-bar.service';
import { KeyValuePair } from '../../../core/models/key-value-pair.model';
import { MatMenuTrigger } from '@angular/material/menu';
import { StorageService } from '../../../shared/services/storage.service';

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
    private transloco: TranslocoService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    const lang = this.transloco.getActiveLang();
    const availableLang = this.transloco.getAvailableLangs() as string[];
    this.currentLanguage = LANG_LABELS[lang];

    availableLang.map((id) => {
      this.availableLanguage.push({
        id: id,
        label: LANG_LABELS[id],
        isActive: id === lang,
      });
    });
  }

  selectMenu(lang: LanguageMenuItem) {
    this.transloco.setActiveLang(lang.id);
    this.currentLanguage = lang.label;
    this.availableLanguage = this.availableLanguage.map((langItem) => ({
      id: langItem.id,
      label: langItem.label,
      isActive: lang.id === langItem.id,
    }));
    this.storageService.setLang(lang.id);
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
