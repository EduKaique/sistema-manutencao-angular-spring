import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SidebarStateService {
  private _isExpanded = signal<boolean>(true);

  readonly isExpanded = this._isExpanded.asReadonly();

  toggle(): void {
    this._isExpanded.update((v) => !v);
  }

  setExpanded(value: boolean): void {
    this._isExpanded.set(value);
  }

  isExpandedValue(): boolean {
    return this._isExpanded();
  }
}
