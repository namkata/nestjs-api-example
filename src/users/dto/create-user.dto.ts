/**
 * Represents a data transfer object for creating a new user.
 *
 * This class is used to encapsulate the data required to create a new user record.
 * It includes the user's email, name, and password.
 */
export class CreateUserDto {
  /**
   * The email address of the user.
   *
   * @type {string}
   */
  email: string;

  /**
   * The name of the user.
   *
   * @type {string}
   */
  name: string;

  /**
   * The password of the user.
   *
   * @type {string}
   */
  password: string;
}
