import { Component, inject } from '@angular/core';
import { Layer } from '../../interfaces/card.interface';
import { CardStore } from '../../stores/card.store';

@Component({
  selector: 'app-uploader',
  standalone: true,
  templateUrl: './uploader.component.html',
  styleUrl: './uploader.component.css',
})
export class UploaderComponent {
	readonly cardStore = inject(CardStore)

	fileList: Layer[] = [];

	applyImages() {
		if (!this.fileList) return;

		this.cardStore.setLayers(this.fileList);
	}

	cleanImages() {
		this.fileList = [];
	}

	changePosition(index: number, direction: number) {	
		if (!this.fileList) return;
		if (index + direction < 0 || index + direction > this.fileList.length - 1) return;
		this.fileList[index].position += direction;
		this.fileList[index + direction].position -= direction;
		this.fileList.sort((a, b) => a.position - b.position);
	}

	async onFileChange(event: Event) {
		const target = event.target as HTMLInputElement;
		const fileList = target.files as FileList;

		this.fileList = await this.fileListToArray(fileList);
		this.fileList.sort((a, b) => a.position - b.position);
	}

	async fileListToArray(fileList: FileList): Promise<Layer[]> {
		const filePromises = Array.from(fileList).map((file, i) => {
			return new Promise<Layer>((resolve, reject) => {
				const reader = new FileReader();
				reader.onload = (e: ProgressEvent<FileReader>) => {
					if (!e.target) return reject(new Error("File read error"));
					resolve({
						file: e.target.result,
						name: file.name,
						position: i,
						type: file.type,
					});
				};
				reader.onerror = () => reject(new Error("File read error"));
				reader.readAsDataURL(file);
			});
		});

		const results = await Promise.all(filePromises);
		return results;
	}


}
