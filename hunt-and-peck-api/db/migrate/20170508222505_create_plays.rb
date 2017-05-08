class CreatePlays < ActiveRecord::Migration[5.0]
  def change
    create_table :plays do |t|
      t.integer :wpm
      t.integer :cpm
      t.float :accuracy
      t.integer :user_id
      t.integer :paragraph_id

      t.timestamps
    end
  end
end
