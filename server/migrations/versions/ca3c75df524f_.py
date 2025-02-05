"""empty message

Revision ID: ca3c75df524f
Revises: 7438840162fd
Create Date: 2021-01-27 12:54:30.455811

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ca3c75df524f'
down_revision = '7438840162fd'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('labware_def',
    sa.Column('id', sa.String(), nullable=False),
    sa.Column('labware_def', sa.JSON(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('labware_def')
    # ### end Alembic commands ###
