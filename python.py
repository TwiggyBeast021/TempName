import random

class Game:
    def __init__(self):
        self.resources = {
            'metal': 0,
            'solar_panel': 0,
            'generator': 0,
            'prestige_points': 0
        }
        self.unlockables = {
            'faster_collection': False,
            'better_encounters': False,
            'advanced_technology': False
        }

    def gather_metal(self):
        self.resources['metal'] += 1

    def craft_solar_panel(self):
        if self.resources['metal'] >= 10:
            self.resources['metal'] -= 10
            self.resources['solar_panel'] += 1

    def craft_generator(self):
        if self.resources['solar_panel'] >= 5:
            self.resources['solar_panel'] -= 5
            self.resources['generator'] += 1

    def prestige(self):
        if self.resources['generator'] >= 10:
            self.resources['prestige_points'] += 1
            self.resources = {
                'metal': 0,
                'solar_panel': 0,
                'generator': 0,
                'prestige_points': self.resources['prestige_points']
            }
            self.unlockables['faster_collection'] = True

    def unlock_faster_collection(self):
        if self.resources['prestige_points'] >= 1:
            self.resources['prestige_points'] -= 1
            self.unlockables['faster_collection'] = True

    def unlock_better_encounters(self):
        if self.resources['prestige_points'] >= 1:
            self.resources['prestige_points'] -= 1
            self.unlockables['better_encounters'] = True

    def unlock_advanced_technology(self):
        if self.resources['prestige_points'] >= 1:
            self.resources['prestige_points'] -= 1
            self.unlockables['advanced_technology'] = True

    def random_encounter(self):
        encounter_type = random.choice(['enemy', 'treasure', 'event'])
        if encounter_type == 'enemy':
            print("You encountered an enemy! Prepare for a battle!")
            # Implement battle mechanics
        elif encounter_type == 'treasure':
            print("You found a hidden treasure! It contains valuable resources!")
            # Modify resource values
        elif encounter_type == 'event':
            print("A rare event occurs! It may have positive or negative effects!")
            # Implement event mechanics

    def play(self):
        while True:
            # Game loop
            self.gather_metal()
            self.craft_solar_panel()
            self.craft_generator()

            if self.resources['generator'] >= 10:
                self.prestige()

            if self.unlockables['faster_collection']:
                # Increase metal collection rate or add a new mechanic

            if self.unlockables['better_encounters']:
                self.random_encounter()

            if self.unlockables['advanced_technology']:
                # Unlock additional crafting options or upgrades

            # Update game state and UI
            self.display_game_state()

    def display_game_state(self):
        print("Resources:")
        print(f"Metal: {self.resources['metal']}")
        print(f"Solar Panels: {self.resources['solar_panel']}")
        print(f"Generators: {self.resources['generator']}")
        print(f"Prestige Points: {self.resources['prestige_points']}")
        print("\nUnlockables:")
        print(f"Faster Collection: {self.unlockables['faster_collection']}")
        print(f"Better Encounters: {self.unlockables['better_encounters']}")
        print(f"Advanced Technology: {self.unlockables['advanced_technology']}")
        print("\nOptions:")
        print("1. Craft Solar Panel")
        print("2. Craft Generator")
        print("3. Prestige")
        print("4. Unlock Faster Collection")
        print("5. Unlock Better Encounters")
        print("6. Unlock Advanced Technology")
        print("7. Quit")

    def handle_input(self, choice):
        if choice == '1':
            self.craft_solar_panel()
        elif choice == '2':
            self.craft_generator()
        elif choice == '3':
            self.prestige()
        elif choice == '4':
            self.unlock_faster_collection()
        elif choice == '5':
            self.unlock_better_encounters()
        elif choice == '6':
            self.unlock_advanced_technology()
        elif choice == '7':
            exit()
        else:
            print("Invalid choice! Please try again.")

        # Update game state and UI
        self.display_game_state()

    def start_game(self):
        print("Welcome to Harness the Sun!")
        self.display_game_state()
        while True:
            choice = input("Enter your choice: ")
            self.handle_input(choice)

game = Game()
game.start_game()
