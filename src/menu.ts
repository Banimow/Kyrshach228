import prompts from "prompts";

export class QuestionTypes {
  static STRING: any = 'string';
  static NUMBER: any = 'number';
};

export interface WindowCommand {
  command: () => void,
  description: string
}

export interface WindowConfig {
  onCreate?: () => void,
  onUpdate?: () => void
}

export class Window {
  public key: string;
  private config: WindowConfig;
  private commands: WindowCommand[];

  constructor(key: string, config: WindowConfig, commands: WindowCommand[]) {
    this.key = key;
    this.config = config;
    this.commands = commands;
  }

  public command(commandIndex: number) {
    try {
      this.commands[commandIndex];
    } catch (err) {
      console.error(err);
    }
  }

  public onCreate(windowKey?: string) {
    try {
      this.config.onCreate ? this.config.onCreate() : null;
    } catch (err) {
      console.error(err);
    }
  }

  public onUpdate() {
    try {
      this.config.onUpdate ? this.config.onUpdate() : null;
    } catch (err) {
      console.error(err);
    }
  }

  public getCommandsDescriptions(): string[] {
    return this.commands.map( (command: WindowCommand, index: number) => (
       `${index + 1}) ${command.description};`
    ) );
  }

  public getCommandsCount(): number {
    return this.commands.length;
  }

  public useCommand(commandIndex: number) {
    try {
      this.commands[commandIndex].command();
    } catch (err) {
      console.error(err);
    }
  }
}

export class Menu {
  private currentWindowKey?: string;
  private currentWindow?: Window;
  private windows: Window[] = [];

  constructor() {}

  private async askUser(message: string, max: number) {
    console.log(message);

    const answer = await prompts({
      type: QuestionTypes.NUMBER,
      name: 'value',
      message: 'Your choice:',
      validate: value => value > max ? "Incorrect value!!!" : true
    });

    return answer;
  }

  private getWindow(windowKey: string): Window | undefined {
    return this.windows.find(({ key }) => key === windowKey);
  }

  public async addWindow(window: Window) {
    this.windows.push(window);
  }

  public setWindow(windowKey: string) {
    if (this.windows.length > 0) {
      this.currentWindow = this.getWindow(windowKey);
    } else {
      console.error("No menu window was found!!!");
    }
  }

  public async checkUserAnswer() {
    if (!this.currentWindowKey || !this.currentWindow) {
      return;
    }

    const userAnswer = await this.askUser(
      this.currentWindow.getCommandsDescriptions().join('\n'),
      this.currentWindow.getCommandsCount()
    );

    return userAnswer.value;
  }

  public changeWindow(windowKey: string) {
    this.currentWindowKey = windowKey;
    this.currentWindow = this.getWindow(windowKey);
  }

  public async use(windowKey: string) {
    this.changeWindow(windowKey);

    if (!this.currentWindow) {
      console.error(`No window with key: ${windowKey} was found!!!`);
      return;
    }

    try {
      this.currentWindow.onCreate();

      const userAnswer: number = await this.checkUserAnswer();

      this.currentWindow.onUpdate();
      this.currentWindow.useCommand(userAnswer - 1);
    } catch (err) {
      console.error(err);
    }
  }

  public static askUser(question: string, type: any, ) {
    return prompts({
      type: type,
      name: 'value',
      message: question
    });
  }

  public static clear() {
    console.clear();
  }

  public static write(...args: any[]) {
    args.forEach(arg => { console.log(arg); });
  }
}
