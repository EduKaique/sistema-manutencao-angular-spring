import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SidebarStateService {
  private _isExpanded = signal<boolean>(true);

  // Read-only signal for templates/components
  readonly isExpanded = this._isExpanded.asReadonly();

  toggle(): void {
    this._isExpanded.update((v) => !v);
  }

  setExpanded(value: boolean): void {
    this._isExpanded.set(value);
  }

  // Convenience accessor for class methods needing boolean
  isExpandedValue(): boolean {
    return this._isExpanded();
  }
}
